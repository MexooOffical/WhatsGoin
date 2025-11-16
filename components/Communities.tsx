
import React from 'react';
import { mockCommunities } from '../data/mockData';
import type { NavigationHandler } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface CommunitiesProps {
    onNavigate: NavigationHandler;
    onLoginRequest: () => void;
}

const Communities: React.FC<CommunitiesProps> = ({ onNavigate, onLoginRequest }) => {
  const { currentUser } = useAuth();
  
  const handleJoin = () => {
    if (!currentUser) {
      onLoginRequest();
    } else {
      // Implement join logic here
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Communities</h1>
            <p className="text-gray-500 mt-1">Find and connect with people who share your interests.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockCommunities.map(community => (
                <div key={community.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <img src={community.imageUrl} alt={community.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                            <p className="font-bold text-lg text-gray-800">{community.name}</p>
                            <p className="text-gray-500">{community.memberCount.toLocaleString()} members</p>
                        </div>
                    </div>
                    <button onClick={handleJoin} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">Join</button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Communities;