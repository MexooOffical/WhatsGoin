import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { Post, Comment, User } from '../types';
import { mockPosts } from '../data/mockData';
import { useAuth } from './AuthContext';

// Helper functions to interact with localStorage
const getPostsFromStorage = (): Post[] => {
  const posts = localStorage.getItem('whatsGoinPosts');
  if (posts) {
    return JSON.parse(posts);
  }
  localStorage.setItem('whatsGoinPosts', JSON.stringify(mockPosts));
  return mockPosts;
};

const setPostsInStorage = (posts: Post[]) => {
  localStorage.setItem('whatsGoinPosts', JSON.stringify(posts));
};

interface PostContextType {
  posts: Post[];
  addPost: (content: string, mood: string, imageUrl?: string) => Promise<Post>;
  addComment: (postId: string, content: string) => Promise<Comment>;
  togglePostLike: (postId: string) => void;
  toggleCommentLike: (postId: string, commentId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(getPostsFromStorage);
  const { currentUser, createNotification } = useAuth();

  useEffect(() => {
    setPostsInStorage(posts);
  }, [posts]);

  const addPost = (content: string, mood: string, imageUrl?: string): Promise<Post> => {
    return new Promise((resolve, reject) => {
      if (!currentUser) {
        return reject(new Error('You must be logged in to post.'));
      }
      const newPost: Post = {
        id: `p${Date.now()}`,
        user: currentUser,
        content,
        imageUrl,
        mood,
        timestamp: 'Just now',
        likes: [],
        comments: [],
        shares: 0,
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
      resolve(newPost);
    });
  };

  const addComment = (postId: string, content: string): Promise<Comment> => {
    return new Promise((resolve, reject) => {
        if (!currentUser) {
            return reject(new Error('You must be logged in to comment.'));
        }
        
        const newComment: Comment = {
            id: `c${Date.now()}`,
            user: currentUser,
            content,
            timestamp: 'Just now',
            likes: [],
        };

        let targetPost: Post | undefined;

        setPosts(prevPosts => {
            const newPosts = prevPosts.map(post => {
                if (post.id === postId) {
                    const updatedPost = { ...post, comments: [...post.comments, newComment] };
                    targetPost = updatedPost;
                    return updatedPost;
                }
                return post;
            });
            return newPosts;
        });

        // Create a notification for the post owner
        if (targetPost && targetPost.user.id !== currentUser.id) {
            createNotification(targetPost.user.id, {
                id: `n${Date.now()}`,
                type: 'comment',
                fromUser: currentUser,
                post: targetPost,
                read: false,
                timestamp: 'Just now',
            });
        }

        resolve(newComment);
    });
  };

  const togglePostLike = (postId: string) => {
    if (!currentUser) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUser.id);
        const newLikes = isLiked
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };
  
  const toggleCommentLike = (postId: string, commentId: string) => {
    if (!currentUser) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              const isLiked = comment.likes.includes(currentUser.id);
              const newLikes = isLiked
                ? comment.likes.filter(id => id !== currentUser.id)
                : [...comment.likes, currentUser.id];
              return { ...comment, likes: newLikes };
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const value = { posts, addPost, addComment, togglePostLike, toggleCommentLike };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};