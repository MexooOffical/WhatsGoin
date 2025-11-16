import React from 'react';
import type { NavigationHandler } from '../types';

interface CreateTimelineProps {
    onNavigate: NavigationHandler;
}

const CreateTimeline: React.FC<CreateTimelineProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Your Daily Timeline</h1>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        A daily timeline is a collection of all your posts from one day, creating a single, shareable story of your experiences, thoughts, and updates.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button 
          onClick={() => onNavigate('CREATE_POST')}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Create Your First Post Today
        </button>
        <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors">
          View Past Timelines
        </button>
      </div>
    </div>
  );
};

export default CreateTimeline;
