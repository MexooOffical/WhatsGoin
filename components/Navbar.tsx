import React, { useState } from 'react';
import { HomeIcon, CompassIcon, UsersIcon, BellIcon, CogIcon, PencilIcon, UserIcon, LogoutIcon } from './icons/Icons';
import type { NavigationHandler, User, Notification } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';

interface NavbarProps {
  onNavigate: NavigationHandler;
  currentUser: User;
  onLoginRequest: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentUser, onLoginRequest }) => {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isGuest = currentUser.id === 'guest';

  const handleProfileClick = () => {
    if (isGuest) {
      onLoginRequest();
    } else {
      setMenuOpen(!menuOpen);
    }
  };
  
  const unreadCount = isGuest ? 0 : currentUser.notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10 h-16 flex items-center px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => onNavigate('HOME')}>
          What'sGoing
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search What'sGoing..."
            className="w-full bg-gray-100 border border-transparent rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-2">
        <NavButton tooltip="Home" onClick={() => onNavigate('HOME')}>
          <HomeIcon />
        </NavButton>
        <NavButton tooltip="Discover" onClick={() => onNavigate('DISCOVER')}>
          <CompassIcon />
        </NavButton>
        <NavButton tooltip="Communities" onClick={() => onNavigate('COMMUNITIES')}>
          <UsersIcon />
        </NavButton>
      </nav>

      <div className="flex items-center gap-2 ml-auto relative">
        <ActionButton tooltip="Create Post" onClick={() => onNavigate('CREATE_POST')}>
            <PencilIcon />
        </ActionButton>
        <div className="relative">
            <ActionButton tooltip="Notifications" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <BellIcon />
                {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>}
            </ActionButton>
            {notificationsOpen && !isGuest && <NotificationDropdown notifications={currentUser.notifications} onClose={() => setNotificationsOpen(false)} />}
        </div>
        <ActionButton tooltip="Settings" onClick={() => onNavigate('SETTINGS')}>
            <CogIcon />
        </ActionButton>
        <div className="relative">
            <button onClick={handleProfileClick} className="flex items-center gap-2 rounded-full hover:bg-gray-100 p-1 transition-colors">
              <Avatar user={currentUser} className="w-8 h-8" />
            </button>
            {!isGuest && menuOpen && (
              <div className="absolute top-12 right-0 bg-white rounded-md shadow-lg w-48 p-2 z-20" onMouseLeave={() => setMenuOpen(false)}>
                <MenuItem onClick={() => { onNavigate('PROFILE', currentUser); setMenuOpen(false); }}>
                  <UserIcon className="w-5 h-5" />
                  <span>Profile</span>
                </MenuItem>
                <MenuItem onClick={() => { logout(); setMenuOpen(false); }}>
                  <LogoutIcon className="w-5 h-5"/>
                  <span>Log Out</span>
                </MenuItem>
              </div>
            )}
        </div>
      </div>
    </header>
  );
};

const NotificationDropdown: React.FC<{notifications: Notification[], onClose: () => void}> = ({notifications, onClose}) => {
    const { markNotificationsAsRead } = useAuth();
    
    useState(() => {
        const timer = setTimeout(() => {
            markNotificationsAsRead();
        }, 3000);
        return () => clearTimeout(timer);
    });

    const getNotificationMessage = (n: Notification) => {
        switch(n.type) {
            case 'comment': return `commented on your post: "${n.post?.content.substring(0, 20)}..."`;
            case 'follow': return `started following you.`;
            case 'like': return `liked your post.`;
            default: return 'New notification.';
        }
    }
    
    return (
        <div className="absolute top-14 right-0 bg-white rounded-lg shadow-xl w-80 max-h-96 overflow-y-auto border" onMouseLeave={onClose}>
            <div className="p-3 font-bold border-b">Notifications</div>
            {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No new notifications.</div>
            ) : (
                notifications.map(n => (
                    <div key={n.id} className={`p-3 flex items-start gap-3 hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`}>
                        <Avatar user={n.fromUser} className="w-10 h-10 mt-1" />
                        <div>
                            <p className="text-sm">
                                <span className="font-semibold">{n.fromUser.name}</span>
                                {' '}
                                {getNotificationMessage(n)}
                            </p>
                            <p className="text-xs text-blue-600">{n.timestamp}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};


const NavButton: React.FC<{ children: React.ReactNode; onClick: () => void; tooltip: string }> = ({ children, onClick, tooltip }) => (
    <button onClick={onClick} className="h-12 w-24 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors relative group">
        {children}
        <span className="absolute bottom-[-28px] text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tooltip}</span>
    </button>
);

const ActionButton: React.FC<{ children: React.ReactNode; tooltip: string; onClick?: () => void; }> = ({ children, tooltip, onClick }) => (
  <button onClick={onClick} className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors relative group">
      {children}
      <span className="absolute top-12 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{tooltip}</span>
  </button>
);

const MenuItem: React.FC<{ children: React.ReactNode; onClick: () => void; }> = ({ children, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
        {children}
    </button>
);


export default Navbar;