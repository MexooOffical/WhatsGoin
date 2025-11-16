import React from 'react';
import PostCard from './PostCard';
import WritePostCard from './WritePostCard';
import { usePosts } from '../contexts/PostContext';
import type { NavigationHandler, User } from '../types';

interface FeedProps {
    onNavigate: NavigationHandler;
    currentUser: User;
    onLoginRequest: () => void;
}

const Feed: React.FC<FeedProps> = ({ onNavigate, currentUser, onLoginRequest }) => {
  const { posts } = usePosts();
  return (
    <div className="flex flex-col gap-4 pb-8">
      <WritePostCard onNavigate={onNavigate} currentUser={currentUser} onLoginRequest={onLoginRequest} />
      {posts.map(post => (
        <PostCard key={post.id} post={post} onNavigate={onNavigate} currentUser={currentUser} onLoginRequest={onLoginRequest} />
      ))}
    </div>
  );
};

export default Feed;