import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { User, UserSettings, Notification } from '../types';
import { mockUsers } from '../data/mockData';

// Helper functions to interact with localStorage
const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem('whatsGoinUsers');
  if (users) {
      return JSON.parse(users);
  }
  // Initialize storage with mock users if it's empty
  localStorage.setItem('whatsGoinUsers', JSON.stringify(mockUsers));
  return mockUsers;
};

const setUsersInStorage = (users: User[]) => {
  localStorage.setItem('whatsGoinUsers', JSON.stringify(users));
};

const getCurrentUserFromStorage = (): User | null => {
  const user = localStorage.getItem('whatsGoinCurrentUser');
  return user ? JSON.parse(user) : null;
};

const setCurrentUserInStorage = (user: User | null) => {
  if (user) {
    localStorage.setItem('whatsGoinCurrentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('whatsGoinCurrentUser');
  }
};

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, name?: string) => Promise<User>;
  logout: () => void;
  toggleFollow: (targetUserId: string) => Promise<User>;
  updateUser: (data: Partial<User> & { settings?: UserSettings }) => Promise<User>;
  createNotification: (userId: string, notification: Notification) => void;
  markNotificationsAsRead: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUserFromStorage();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    getUsersFromStorage();
    setLoading(false);
  }, []);
  
  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      const users = getUsersFromStorage();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        setCurrentUserInStorage(user);
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  };

  const signup = (email: string, password: string, name?: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        const users = getUsersFromStorage();
        if (users.some(u => u.email === email)) {
            return reject(new Error('An account with this email already exists.'));
        }

        const newUser: User = {
            id: `u${users.length + 1}`,
            name: name || `user${users.length + 1}`,
            username: (name || `user${users.length + 1}`).toLowerCase().replace(/\s/g, '') || `user${users.length + 1}`,
            email,
            password,
            avatarUrl: ``,
            bio: '',
            mood: 'Just Joined ✨',
            followers: [],
            following: [],
            notifications: [],
            settings: {
              notifications: { comments: true, likes: true, newFollowers: true },
              privacy: { isPrivate: false }
            }
        };
        
        const updatedUsers = [...users, newUser];
        setUsersInStorage(updatedUsers);
        setCurrentUser(newUser);
        setCurrentUserInStorage(newUser);
        resolve(newUser);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentUserInStorage(null);
  };
  
  const createNotification = (userId: string, notification: Notification) => {
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        // Only notify if user has settings enabled for it
        const user = users[userIndex];
        const shouldNotify = (notification.type === 'comment' && user.settings.notifications.comments) ||
                             (notification.type === 'like' && user.settings.notifications.likes) ||
                             (notification.type === 'follow' && user.settings.notifications.newFollowers);
        
        if (shouldNotify) {
            users[userIndex].notifications.unshift(notification);
            setUsersInStorage(users);
        }
    }
  };

  const markNotificationsAsRead = () => {
    if (!currentUser) return;
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex] };
        updatedUser.notifications = updatedUser.notifications.map(n => ({...n, read: true }));
        users[userIndex] = updatedUser;
        setUsersInStorage(users);
        setCurrentUser(updatedUser);
        setCurrentUserInStorage(updatedUser);
    }
  };

  const toggleFollow = (targetUserId: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (!currentUser) {
        return reject(new Error('You must be logged in to follow users.'));
      }
      if (currentUser.id === targetUserId) {
        return reject(new Error('You cannot follow yourself.'));
      }

      const users = getUsersFromStorage();
      
      const currentUserIndex = users.findIndex(u => u.id === currentUser.id);
      const targetUserIndex = users.findIndex(u => u.id === targetUserId);

      if (currentUserIndex === -1 || targetUserIndex === -1) {
        return reject(new Error('User not found.'));
      }

      const updatedCurrentUser = { ...users[currentUserIndex] };
      const updatedTargetUser = { ...users[targetUserIndex] };
      
      const isFollowing = updatedCurrentUser.following.includes(targetUserId);

      if (isFollowing) {
        updatedCurrentUser.following = updatedCurrentUser.following.filter(id => id !== targetUserId);
        updatedTargetUser.followers = updatedTargetUser.followers.filter(id => id !== currentUser.id);
      } else {
        updatedCurrentUser.following.push(targetUserId);
        updatedTargetUser.followers.push(currentUser.id);
        createNotification(targetUserId, {
            id: `n${Date.now()}`,
            type: 'follow',
            fromUser: currentUser,
            read: false,
            timestamp: 'Just now'
        });
      }

      users[currentUserIndex] = updatedCurrentUser;
      users[targetUserIndex] = updatedTargetUser;
      
      setUsersInStorage(users);
      setCurrentUser(updatedCurrentUser);
      setCurrentUserInStorage(updatedCurrentUser);

      resolve(updatedTargetUser);
    });
  };

  const updateUser = (data: Partial<User> & { settings?: UserSettings }): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (!currentUser) {
        return reject(new Error("No user is logged in."));
      }

      const users = getUsersFromStorage();
      const currentUserIndex = users.findIndex(u => u.id === currentUser.id);

      if (currentUserIndex === -1) {
        return reject(new Error("Current user not found in storage."));
      }
      
      const existingUser = users[currentUserIndex];
      const updatedUser: User = { 
        ...existingUser,
        ...data,
        settings: data.settings ? { ...existingUser.settings, ...data.settings } : existingUser.settings
      };

      users[currentUserIndex] = updatedUser;

      setUsersInStorage(users);
      setCurrentUser(updatedUser);
      setCurrentUserInStorage(updatedUser);
      resolve(updatedUser);
    });
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    toggleFollow,
    updateUser,
    createNotification,
    markNotificationsAsRead
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};