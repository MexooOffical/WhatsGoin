import React from 'react';
import { mockTrends, mockUsers, mockCommunities } from '../data/mockData';
import type { NavigationHandler } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';

interface SidebarRightProps {
    onNavigate: NavigationHandler;
    onLoginRequest: () => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ onNavigate, onLoginRequest }) => {
  const { currentUser, toggleFollow } = useAuth();
  const suggestedWriters = mockUsers.filter(u => u.id !== currentUser?.id).slice(0, 3);

  const handleFollowToggle = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    if (!currentUser) {
      onLoginRequest();
    } else {
      toggleFollow(userId).catch(err => console.error("Follow failed", err));
    }
  };

  return (
    <aside className="hidden lg:block w-72 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex flex-col gap-4 p-2">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-3">Trending Tags</h3>
          <div className="flex flex-col gap-2">
            {mockTrends.map(trend => (
              <div key={trend.tag} className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                <p className="font-semibold text-gray-800">{trend.tag}</p>
                <p className="text-sm text-gray-500">{trend.postCount.toLocaleString()} posts</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-3">Suggested Writers</h3>
          <div className="flex flex-col gap-3">
            {suggestedWriters.map(user => {
              const isFollowing = currentUser?.following.includes(user.id);
              return (
                <div key={user.id} className="flex items-center gap-3">
                  <button onClick={() => onNavigate('PROFILE', user)}>
                    <Avatar user={user} className="w-10 h-10" />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 cursor-pointer" onClick={() => onNavigate('PROFILE', user)}>{user.name}</p>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                  </div>
                  <button 
                    onClick={(e) => handleFollowToggle(e, user.id)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                      isFollowing 
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-3">Daily Inspirational Quote</h3>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            <p>"The journey of a thousand miles begins with a single step."</p>
            <cite className="text-sm text-gray-500 block mt-2">- Lao Tzu</cite>
          </blockquote>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-3">Communities You May Like</h3>
          <div className="flex flex-col gap-3">
            {mockCommunities.map(community => (
              <div key={community.id} className="flex items-center gap-3">
                <img src={community.imageUrl} alt={community.name} className="w-10 h-10 rounded-lg"/>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{community.name}</p>
                  <p className="text-xs text-gray-500">{community.memberCount.toLocaleString()} members</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;