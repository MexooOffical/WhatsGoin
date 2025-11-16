export interface UserSettings {
  notifications: {
    comments: boolean;
    likes: boolean;
    newFollowers: boolean;
  };
  privacy: {
    isPrivate: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow';
  fromUser: User;
  post?: Post;
  read: boolean;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  email?: string;
  password?: string;
  bio?: string;
  mood?: string;
  followers: string[];
  following: string[];
  notifications: Notification[];
  settings: UserSettings;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: string[]; // User IDs
}

export interface Post {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  tags?: string[];
  timestamp: string;
  likes: string[]; // User IDs
  comments: Comment[];
  shares: number;
  mood?: string;
}

export interface Trend {
  tag: string;
  postCount: number;
}

export interface Community {
  id: string;
  name: string;
  memberCount: number;
  imageUrl: string;
}

export type ViewType = 'HOME' | 'PROFILE' | 'DISCOVER' | 'COMMUNITIES' | 'CREATE_POST' | 'SETTINGS' | 'BOOKMARKS' | 'TRENDS' | 'TIMELINE';

export type NavigationHandler = (view: ViewType, user?: User) => void;