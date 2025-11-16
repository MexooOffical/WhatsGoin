import React, { useState, useRef, ChangeEvent } from 'react';
import { CameraIcon, UserIcon as ProfileIcon, BellIcon, LockIcon } from './icons/Icons';
import type { User, UserSettings } from '../types';
import Avatar from './Avatar';

interface SettingsProps {
  user: User;
  onUpdateUser: (data: Partial<User> & { settings?: UserSettings }) => Promise<User>;
}

type SettingsTab = 'profile' | 'notifications' | 'privacy';

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 sm:p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences.</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 p-4 border-b md:border-r">
          <nav className="flex md:flex-col gap-1">
            <SettingsTabButton
              label="Profile"
              icon={<ProfileIcon />}
              isActive={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
            <SettingsTabButton
              label="Notifications"
              icon={<BellIcon />}
              isActive={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')}
            />
            <SettingsTabButton
              label="Privacy"
              icon={<LockIcon />}
              isActive={activeTab === 'privacy'}
              onClick={() => setActiveTab('privacy')}
            />
          </nav>
        </aside>
        <main className="w-full md:w-3/4 p-4 sm:p-6">
          {activeTab === 'profile' && <ProfileSettings user={user} onUpdateUser={onUpdateUser} />}
          {activeTab === 'notifications' && <NotificationSettings user={user} onUpdateUser={onUpdateUser} />}
          {activeTab === 'privacy' && <PrivacySettings user={user} onUpdateUser={onUpdateUser} />}
        </main>
      </div>
    </div>
  );
};

const SettingsTabButton: React.FC<{ label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-semibold rounded-md transition-colors ${
            isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const ProfileSettings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        username: user.username || '',
        bio: user.bio || '',
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatarUrl);
    const [newAvatarFile, setNewAvatarFile] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarClick = () => avatarInputRef.current?.click();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setAvatarPreview(base64String);
                setNewAvatarFile(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData: Partial<User> = { ...formData };
            if (newAvatarFile) updateData.avatarUrl = newAvatarFile;
            await onUpdateUser(updateData);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const tempUserForPreview = { ...user, avatarUrl: avatarPreview || user.avatarUrl };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="relative h-24 bg-gray-200 rounded-lg mb-12">
                 <div className="absolute -bottom-10 left-4">
                    <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <Avatar user={tempUserForPreview} className="w-24 h-24 border-4 border-white" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <CameraIcon className="w-8 h-8" />
                        </div>
                    </div>
                 </div>
            </div>
            <input type="file" ref={avatarInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            
            <div className="space-y-6 pt-2">
                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
                <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />
                <TextAreaField label="Bio" name="bio" value={formData.bio} onChange={handleChange} />
            </div>
            <div className="mt-8 pt-4 border-t flex justify-end">
                <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:bg-blue-300">
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
};

const NotificationSettings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
    const [settings, setSettings] = useState(user.settings.notifications);

    const handleToggle = (key: keyof typeof settings) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings);
        onUpdateUser({ settings: { ...user.settings, notifications: newSettings } });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">Notifications</h3>
            <p className="text-gray-500">Control how you receive notifications from What'sGoing.</p>
            <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-semibold">Comments on my posts</h4>
                    <p className="text-sm text-gray-500">Notify me when someone comments on one of my posts.</p>
                </div>
                <ToggleSwitch checked={settings.comments} onChange={() => handleToggle('comments')} />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-semibold">Likes on my posts</h4>
                    <p className="text-sm text-gray-500">Notify me when someone likes one of my posts.</p>
                </div>
                <ToggleSwitch checked={settings.likes} onChange={() => handleToggle('likes')} />
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-semibold">New followers</h4>
                    <p className="text-sm text-gray-500">Notify me when a new user follows me.</p>
                </div>
                <ToggleSwitch checked={settings.newFollowers} onChange={() => handleToggle('newFollowers')} />
            </div>
        </div>
    );
};

const PrivacySettings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
    const [settings, setSettings] = useState(user.settings.privacy);

    const handleToggle = (key: keyof typeof settings) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings);
        onUpdateUser({ settings: { ...user.settings, privacy: newSettings } });
    };
    return (
         <div className="space-y-6">
            <h3 className="text-xl font-bold">Privacy & Security</h3>
            <p className="text-gray-500">Manage who can see your information and posts.</p>
            <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-semibold">Private Account</h4>
                    <p className="text-sm text-gray-500">When your account is private, only people you approve can see your posts.</p>
                </div>
                <ToggleSwitch checked={settings.isPrivate} onChange={() => handleToggle('isPrivate')} />
            </div>
        </div>
    );
};

// --- Form Field Components ---
const InputField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input 
            type="text" name={name} value={value} onChange={onChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);
const TextAreaField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea 
            name={name} value={value} onChange={onChange} rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
        />
    </div>
);
const ToggleSwitch: React.FC<{checked: boolean, onChange: () => void}> = ({ checked, onChange }) => (
    <label className="switch-toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch-slider"></span>
    </label>
);


export default Settings;