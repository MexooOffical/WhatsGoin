import React from 'react';
import { HomeIcon, UserIcon, BookmarkIcon, TrendingUpIcon, UsersIcon, CogIcon, ClockIcon } from './icons/Icons';
import type { NavigationHandler, User } from '../types';
import Avatar from './Avatar';


interface SidebarLeftProps {
    onNavigate: NavigationHandler;
    currentUser: User;
    onLoginRequest: () => void;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ onNavigate, currentUser, onLoginRequest }) => {
  const isGuest = currentUser.id === 'guest';
  
  return (
    <aside className="hidden md:block w-72 sticky top-20 h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-1 p-2">
        <button 
          onClick={isGuest ? onLoginRequest : () => onNavigate('PROFILE', currentUser)}
          className="flex items-center gap-4 w-full text-left p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          <Avatar user={currentUser} className="w-8 h-8" />
          <span className="font-semibold text-gray-700">{currentUser.name}</span>
        </button>
        <SidebarItem icon={<HomeIcon />} label="Home" onClick={() => onNavigate('HOME')} />
        <SidebarItem icon={<ClockIcon />} label="My Daily Timeline" onClick={() => onNavigate('TIMELINE')} />
        <SidebarItem icon={<BookmarkIcon />} label="Bookmarks" onClick={() => onNavigate('BOOKMARKS')} />
        <SidebarItem icon={<TrendingUpIcon />} label="Trends" onClick={() => onNavigate('TRENDS')} />
        <SidebarItem icon={<UsersIcon />} label="Communities" onClick={() => onNavigate('COMMUNITIES')} />
        <SidebarItem icon={<CogIcon />} label="Settings" onClick={() => onNavigate('SETTINGS')} />
      </div>
    </aside>
  );
};


interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4 w-full text-left p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
            <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
            <span className="font-semibold text-gray-700">{label}</span>
        </button>
    );
};

export default SidebarLeft;
