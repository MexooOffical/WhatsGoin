import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Discover from './components/Discover';
import Communities from './components/Communities';
import CreatePost from './components/CreatePost';
import AuthPage from './components/AuthPage';
import Settings from './components/Settings';
import CreateTimeline from './components/CreateTimeline';
import { useAuth } from './contexts/AuthContext';
import type { ViewType, User } from './types';

const GUEST_USER: User = {
  id: 'guest',
  name: 'Unknown',
  username: 'guest',
  avatarUrl: '', // Will be handled by components to show a default avatar
  followers: [],
  following: [],
  notifications: [],
  settings: {
    notifications: { comments: true, likes: true, newFollowers: true },
    privacy: { isPrivate: false }
  }
};

const App: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [activeView, setActiveView] = useState<ViewType>('HOME');
  const [activeProfile, setActiveProfile] = useState<User | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isAuthPageVisible, setIsAuthPageVisible] = useState(false);

  const displayUser = currentUser || GUEST_USER;

  const handleLoginRequest = () => {
    setIsAuthPageVisible(true);
  };
  
  const handleNavigate = (view: ViewType, profileUser?: User) => {
    const requiresAuth = (view === 'CREATE_POST') || 
                         (view === 'PROFILE' && !profileUser) ||
                         ['TIMELINE', 'BOOKMARKS', 'SETTINGS'].includes(view);
                         
    if (!currentUser && requiresAuth) {
        handleLoginRequest();
        return;
    }

    if (view === 'CREATE_POST') {
      setIsCreatingPost(true);
    } else {
      setIsCreatingPost(false);
      setActiveView(view);
      if (view === 'PROFILE' && profileUser) {
        setActiveProfile(profileUser);
      } else if (view === 'PROFILE' && currentUser) {
        setActiveProfile(currentUser);
      }
    }
  };
  
  const handlePostCreated = () => {
    setIsCreatingPost(false);
    setActiveView('HOME');
  };

  const handleProfileUpdate = (updatedUser: User) => {
    if (activeProfile && activeProfile.id === updatedUser.id) {
      setActiveProfile(updatedUser);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'HOME':
        return <Feed onNavigate={handleNavigate} currentUser={displayUser} onLoginRequest={handleLoginRequest} />;
      case 'PROFILE':
        return activeProfile && activeProfile.id !== 'guest' ? 
            <Profile user={activeProfile} onNavigate={handleNavigate} isOwnProfile={activeProfile.id === displayUser.id} onLoginRequest={handleLoginRequest} currentUser={displayUser} onUpdateUser={handleProfileUpdate} /> 
            : <Feed onNavigate={handleNavigate} currentUser={displayUser} onLoginRequest={handleLoginRequest}/>;
      case 'DISCOVER':
        return <Discover onNavigate={handleNavigate} onLoginRequest={handleLoginRequest} />;
      case 'COMMUNITIES':
        return <Communities onNavigate={handleNavigate} onLoginRequest={handleLoginRequest} />;
      case 'SETTINGS':
        return currentUser ? <Settings user={currentUser} onUpdateUser={updateUser} /> : null;
      case 'TIMELINE':
        return <CreateTimeline onNavigate={handleNavigate} />;
      default:
        return <Feed onNavigate={handleNavigate} currentUser={displayUser} onLoginRequest={handleLoginRequest} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Navbar onNavigate={handleNavigate} currentUser={displayUser} onLoginRequest={handleLoginRequest} />
      <main className="flex gap-6 px-4 lg:px-6 pt-20">
        <SidebarLeft onNavigate={handleNavigate} currentUser={displayUser} onLoginRequest={handleLoginRequest} />
        <div className="flex-grow max-w-2xl mx-auto">
          {renderContent()}
        </div>
        <SidebarRight onNavigate={handleNavigate} onLoginRequest={handleLoginRequest} />
      </main>
      {isCreatingPost && currentUser && <CreatePost onClose={() => setIsCreatingPost(false)} onPost={handlePostCreated} currentUser={currentUser} />}
      {isAuthPageVisible && <AuthPage onClose={() => setIsAuthPageVisible(false)} />}
    </div>
  );
};

export default App;