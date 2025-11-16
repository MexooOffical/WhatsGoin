import React, { useState } from 'react';
import PostCard from './PostCard';
import type { User, NavigationHandler } from '../types';
import Avatar from './Avatar';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostContext';

interface ProfileProps {
  user: User;
  onNavigate: NavigationHandler;
  isOwnProfile: boolean;
  onLoginRequest: () => void;
  currentUser: User;
  onUpdateUser: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onNavigate, isOwnProfile, onLoginRequest, currentUser, onUpdateUser }) => {
  const { toggleFollow } = useAuth();
  const { posts } = usePosts();
  const userPosts = posts.filter(p => p.user.id === user.id);
  
  const isFollowing = currentUser.id !== 'guest' && user.id !== currentUser.id && currentUser.following.includes(user.id);

  const handleFollowToggle = async () => {
    if (currentUser.id === 'guest') {
      onLoginRequest();
      return;
    }
    try {
      const updatedTargetUser = await toggleFollow(user.id);
      const updatedUserWithCorrectFollowers = { ...user, followers: updatedTargetUser.followers };
      onUpdateUser(updatedUserWithCorrectFollowers); 
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div>
          <div className="h-36 sm:h-48 md:h-64 bg-gray-200">
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-20">
                <div className="flex flex-col items-center sm:flex-row sm:items-end">
                    <div className="relative">
                       <Avatar user={user} className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-white" />
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 w-full sm:w-auto flex justify-center">
                    {isOwnProfile ? (
                        <button onClick={() => onNavigate('SETTINGS')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors w-full sm:w-auto">Edit Profile</button>
                    ) : (
                        <button 
                        onClick={handleFollowToggle} 
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors w-full sm:w-auto ${
                            isFollowing 
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                        >
                        {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>
            {user.bio && <p className="mt-4 text-gray-600 text-center sm:text-left">{user.bio}</p>}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-around text-center">
              <Stat value={userPosts.length} label="Posts" />
              <Stat value={user.followers.length} label="Followers" />
              <Stat value={user.following.length} label="Following" />
              {user.mood && <Stat value={user.mood} label="Streak" />}
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200 px-4 flex gap-4">
            <TabButton label="Posts" active />
            <TabButton label="Daily Timeline" />
            <TabButton label="About" />
            <TabButton label="Collections" />
        </div>
      </div>
      
      {/* User's Posts */}
      {userPosts.length > 0 ? (
          userPosts.map(post => <PostCard key={post.id} post={post} onNavigate={onNavigate} currentUser={currentUser} onLoginRequest={onLoginRequest}/>)
      ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              <p>{user.name} hasn't posted anything yet.</p>
          </div>
      )}
    </div>
  );
};

const Stat: React.FC<{ value: number | string; label: string }> = ({ value, label }) => (
  <div>
    <p className="text-xl font-bold">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);


const TabButton: React.FC<{label: string, active?: boolean}> = ({ label, active = false }) => (
    <button className={`py-3 font-semibold ${active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100 px-2 rounded-t-lg'}`}>
        {label}
    </button>
);

export default Profile;