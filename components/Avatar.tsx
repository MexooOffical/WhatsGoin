import React from 'react';
import type { User } from '../types';

interface AvatarProps {
  user: User;
  className?: string;
  textClassName?: string;
}

const Avatar: React.FC<AvatarProps> = ({ user, className = 'w-10 h-10', textClassName = 'font-bold' }) => {
  const getInitials = (user: User): string => {
    if (user.id === 'guest') return 'W';
    const name = user.name?.trim();
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        const first = names[0][0];
        const last = names[names.length - 1][0];
        if (first && last) return `${first}${last}`.toUpperCase();
    }
    return name[0]?.toUpperCase() || '?';
  };

  const colors = [
    'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'
  ];
  
  const getColor = (id: string) => {
    if (id === 'guest') return 'bg-blue-600';
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  if (user && user.avatarUrl) {
    return <img src={user.avatarUrl} alt={user.name} className={`${className} rounded-full object-cover flex-shrink-0`} />;
  }
  
  const initials = getInitials(user);
  const sizeClasses = className || '';
  let textSize = 'text-lg';

  if (sizeClasses.includes('w-6') || sizeClasses.includes('h-6')) {
    textSize = initials.length > 1 ? 'text-[0.6rem]' : 'text-xs';
  } else if (sizeClasses.includes('w-8') || sizeClasses.includes('h-8')) {
    textSize = initials.length > 1 ? 'text-sm' : 'text-base';
  } else if (sizeClasses.includes('w-10') || sizeClasses.includes('h-10')) {
     textSize = initials.length > 1 ? 'text-base' : 'text-xl';
  } else if (sizeClasses.includes('w-16') || sizeClasses.includes('h-16')) {
    textSize = initials.length > 1 ? 'text-2xl' : 'text-3xl';
  } else if (sizeClasses.includes('w-32') || sizeClasses.includes('h-32')) {
    textSize = initials.length > 1 ? 'text-5xl' : 'text-6xl';
  }

  return (
    <div className={`${className} rounded-full ${getColor(user.id)} text-white flex items-center justify-center select-none flex-shrink-0`}>
      <span className={`${textClassName} ${textSize}`}>{initials}</span>
    </div>
  );
};

export default Avatar;
