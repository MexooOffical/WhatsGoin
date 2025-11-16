
import React from 'react';
import { mockPosts, mockUsers, mockTrends } from '../data/mockData';
import type { NavigationHandler } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';

interface DiscoverProps {
    onNavigate: NavigationHandler;
    onLoginRequest: () => void;
}

const Discover: React.FC<DiscoverProps> = ({ onNavigate, onLoginRequest }) => {
  const { currentUser, toggleFollow } = useAuth();
  
  const handleFollowToggle = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation(); // Prevent navigation when clicking the follow button
    if (!currentUser) {
      onLoginRequest();
    } else {
      toggleFollow(userId).catch(err => console.error("Follow failed", err));
    }
  };

  const topWriters = mockUsers.filter(u => u.id !== currentUser?.id).slice(0, 4);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <Section title="Popular Posts">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPosts.slice(0, 3).map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                {post.imageUrl && <img src={post.imageUrl} alt="Post" className="h-40 w-full object-cover" />}
                <div className="p-4">
                    <p className="text-sm text-gray-600 truncate">{post.content}</p>
                    <div className="flex items-center mt-2 gap-2 text-xs text-gray-500">
                        <Avatar user={post.user} className="w-6 h-6" />
                        <span>{post.user.name}</span>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Top Writers">
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topWriters.map(user => {
                const isFollowing = currentUser?.following.includes(user.id);
                return (
                    <div key={user.id} onClick={() => onNavigate('PROFILE', user)} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow">
                        <Avatar user={user} className="w-16 h-16" />
                        <p className="font-semibold mt-2">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                        <button 
                          onClick={(e) => handleFollowToggle(e, user.id)}
                          className={`mt-3 px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                            isFollowing
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                )
            })}
        </div>
      </Section>

      <Section title="Trending Tags">
        <div className="flex flex-wrap gap-3">
            {mockTrends.map(trend => (
                <div key={trend.tag} className="bg-white rounded-full px-4 py-2 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
                    <p className="font-semibold text-blue-600">{trend.tag}</p>
                </div>
            ))}
        </div>
      </Section>
    </div>
  );
};


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        {children}
    </div>
);


export default Discover;