import React, { useState, useRef, ChangeEvent } from 'react';
import { XIcon, ImageIcon, TagIcon } from './icons/Icons';
import type { User } from '../types';
import Avatar from './Avatar';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';

interface CreatePostProps {
  onClose: () => void;
  onPost: () => void;
  currentUser: User;
}

const GEN_Z_MOODS = [
    'Excited', 'Chilling', 'Productive', 'Creative', 'Adventurous', 'Relaxed', 'Focused', 'Dreamy', 
    'Nostalgic', 'Hopeful', 'Energetic', 'Goofy', 'Vibing', 'Grateful', 'Curious', 'Spontaneous', 
    'Cozy', 'Inspired', 'Mellow', 'Playful'
];


const CreatePost: React.FC<CreatePostProps> = ({ onClose, onPost, currentUser }) => {
  const { addPost } = usePosts();
  const { updateUser } = useAuth();
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(currentUser.mood || '');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if(imageInputRef.current) {
        imageInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (content.trim() === '' || !selectedMood) {
      alert("Please write something and select your streak.");
      return;
    }
    setLoading(true);
    try {
      await addPost(content, selectedMood, imagePreview || undefined);
      if (currentUser.mood !== selectedMood) {
        await updateUser({ mood: selectedMood });
      }
      onPost();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-modal-fade-in flex flex-col max-h-[90vh]">
        <div className="relative p-4 border-b border-gray-200 text-center flex-shrink-0">
          <h2 className="text-xl font-bold">Create Written Vlog</h2>
          <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <XIcon />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar user={currentUser} className="w-10 h-10" />
              <div>
                <p className="font-semibold">{currentUser.name}</p>
                <p className="text-sm text-gray-500">@{currentUser.username}</p>
              </div>
            </div>
            <textarea
              placeholder="Write your thoughts or your daily update..."
              className="w-full h-36 border-gray-200 border rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none text-base p-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {imagePreview && (
              <div className="mt-4 relative">
                <img src={imagePreview} alt="Selected preview" className="rounded-lg w-full max-h-60 object-contain" />
                <button onClick={handleRemoveImage} className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-60 rounded-full text-white hover:bg-opacity-80">
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">What's your current Streak?</label>
            <div className="flex flex-wrap gap-2">
                {GEN_Z_MOODS.map(mood => (
                  <button
                    type="button"
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      selectedMood === mood 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex gap-2">
            <input type="file" ref={imageInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <button onClick={handleImageButtonClick} className="p-2 rounded-full hover:bg-gray-100 text-blue-500">
                <ImageIcon />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-green-500">
                <TagIcon />
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={loading} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:bg-blue-300">
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;