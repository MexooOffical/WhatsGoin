import React from 'react';
import { ImageIcon, TagIcon } from './icons/Icons';
import type { NavigationHandler, User } from '../types';
import Avatar from './Avatar';

interface WritePostCardProps {
    onNavigate: NavigationHandler;
    currentUser: User;
    onLoginRequest: () => void;
}

const WritePostCard: React.FC<WritePostCardProps> = ({ onNavigate, currentUser, onLoginRequest }) => {
  const isGuest = currentUser.id === 'guest';
  
  const handleAction = () => {
    if (isGuest) {
      onLoginRequest();
    } else {
      onNavigate('CREATE_POST');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <Avatar user={currentUser} className="w-10 h-10" />
        <button
          onClick={handleAction}
          className="w-full text-left bg-gray-100 rounded-full py-2 px-4 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          Write your thoughts or your daily update...
        </button>
      </div>
      <div className="flex justify-around pt-2">
        <PostActionButton icon={<ImageIcon />} label="Add Image" onClick={handleAction} />
        <PostActionButton icon={<TagIcon />} label="Add Tag" onClick={handleAction} />
        <button 
          onClick={handleAction}
          className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
};

const PostActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors">
    {icon}
    <span>{label}</span>
  </button>
);

export default WritePostCard;
