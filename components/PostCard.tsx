import React, { useState } from 'react';
import type { Post, NavigationHandler, User, Comment } from '../types';
import { ThumbsUpIcon, MessageSquareIcon, Share2Icon, BookmarkIcon, MoreHorizontalIcon, SendIcon } from './icons/Icons';
import Avatar from './Avatar';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';


interface PostCardProps {
  post: Post;
  onNavigate: NavigationHandler;
  currentUser: User;
  onLoginRequest: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onNavigate, currentUser, onLoginRequest }) => {
  const [showComments, setShowComments] = useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [animateCount, setAnimateCount] = useState(false);
  const { togglePostLike, addComment } = usePosts();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isGuest = currentUser.id === 'guest';
  const isLiked = !isGuest && post.likes.includes(currentUser.id);

  const handleAuthAction = (action?: () => void) => {
    if (isGuest) {
      onLoginRequest();
    } else if (action) {
      action();
    }
  };

  const handleLike = () => handleAuthAction(() => {
    if (!isLiked) {
        setAnimateLike(true);
        setAnimateCount(true);
        setTimeout(() => setAnimateLike(false), 500);
        setTimeout(() => setAnimateCount(false), 300);
    }
    togglePostLike(post.id);
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() === '' || isSubmitting) return;

    handleAuthAction(async () => {
        setIsSubmitting(true);
        try {
            await addComment(post.id, commentText);
            setCommentText('');
            setShowComments(true);
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button onClick={() => onNavigate('PROFILE', post.user)}>
                  <Avatar user={post.user} className="w-10 h-10" />
                </button>
                <div>
                    <p className="font-semibold text-gray-800 cursor-pointer" onClick={() => onNavigate('PROFILE', post.user)}>{post.user.name}</p>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                <MoreHorizontalIcon />
            </button>
        </div>
        <p className="mt-4 text-gray-700 whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="mt-4 rounded-lg w-full" />}
        {post.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map(tag => <span key={tag} className="text-sm text-blue-600 font-semibold cursor-pointer hover:underline">{tag}</span>)}
          </div>
        )}
      </div>
      <div className="px-4 py-2 flex justify-between items-center border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500 gap-1">
            <ThumbsUpIcon className="w-4 h-4 text-blue-500" />
            <span className={animateCount ? 'like-count-animated' : ''}>{post.likes.length}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 gap-1">
            <span>{post.comments.length} Comments</span>
            <span>·</span>
            <span>{post.shares} Shares</span>
        </div>
      </div>
      <div className="px-2 py-1 flex justify-around border-t border-gray-200">
        <ActionButton label="Like" isLiked={isLiked} onClick={handleLike}>
          <ThumbsUpIcon className={`w-5 h-5 ${animateLike ? 'like-icon-animated' : ''}`} />
        </ActionButton>
        <ActionButton label="Comment" onClick={() => handleAuthAction(() => setShowComments(!showComments))}>
          <MessageSquareIcon className="w-5 h-5" />
        </ActionButton>
        <ActionButton label="Share" onClick={() => handleAuthAction()}>
          <Share2Icon className="w-5 h-5" />
        </ActionButton>
        <ActionButton label="Save" onClick={() => handleAuthAction()}>
          <BookmarkIcon className="w-5 h-5" />
        </ActionButton>
      </div>
      {showComments && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleCommentSubmit} className="flex items-start gap-3 mb-4">
            <Avatar user={currentUser} className="w-8 h-8 mt-1" />
            <div className="w-full bg-gray-100 rounded-lg flex items-center pr-2">
              <input 
                type="text" 
                placeholder="Write a comment..." 
                onClick={() => handleAuthAction()} 
                className="w-full bg-transparent px-4 py-2 focus:outline-none" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" disabled={isSubmitting || commentText.trim() === ''} className="p-2 rounded-full text-blue-600 hover:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
                  <SendIcon />
              </button>
            </div>
          </form>
          {post.comments.map(comment => (
            <CommentItem key={comment.id} postId={post.id} comment={comment} currentUser={currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentItem: React.FC<{postId: string, comment: Comment, currentUser: User}> = ({postId, comment, currentUser}) => {
    const { toggleCommentLike } = usePosts();
    const isGuest = currentUser.id === 'guest';
    const isLiked = !isGuest && comment.likes.includes(currentUser.id);

    const handleLike = () => {
        if(isGuest) return;
        toggleCommentLike(postId, comment.id);
    }
    return (
        <div className="flex items-start gap-3 mt-3">
            <Avatar user={comment.user} className="w-8 h-8" />
            <div>
                <div className="bg-gray-100 rounded-xl p-3">
                    <p className="font-semibold text-sm">{comment.user.name}</p>
                    <p className="text-sm">{comment.content}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 pl-3">
                    <span>{comment.timestamp}</span>
                    <button onClick={handleLike} className={`font-semibold ${isLiked ? 'text-blue-600' : 'hover:underline'}`}>Like</button>
                    {comment.likes.length > 0 && 
                        <span className="flex items-center gap-1">
                            <ThumbsUpIcon className="w-3 h-3 text-blue-500" /> 
                            {comment.likes.length}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

const ActionButton: React.FC<{
  label: string;
  isLiked?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ label, children, isLiked, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`like-button flex-1 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors font-medium ${isLiked ? 'text-blue-600 liked' : 'text-gray-600'}`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
};

export default PostCard;