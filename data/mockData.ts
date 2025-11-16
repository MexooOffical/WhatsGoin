import type { User, Post, Comment, Trend, Community, UserSettings } from '../types';

const defaultSettings: UserSettings = {
  notifications: {
    comments: true,
    likes: true,
    newFollowers: true,
  },
  privacy: {
    isPrivate: false,
  },
};

export const mockUser: User = {
  id: 'u1',
  name: 'Alex Chen',
  username: 'alexchen',
  email: 'alex@example.com',
  password: 'password123',
  avatarUrl: 'https://picsum.photos/id/1005/200/200',
  bio: 'Writer, dreamer, and coffee enthusiast. Chronicling my daily adventures one line at a time.',
  mood: 'Creative',
  followers: ['u2', 'u3', 'u4'],
  following: ['u2', 'u5'],
  notifications: [],
  settings: defaultSettings,
};

export const mockUsers: User[] = [
  mockUser,
  { id: 'u2', name: 'Bella Rodriguez', username: 'bella_r', email: 'bella@example.com', password: 'password123', avatarUrl: 'https://picsum.photos/id/1027/200/200', bio: 'Exploring the world and sharing my stories.', mood: 'Adventurous', followers: ['u1'], following: ['u1', 'u3'], notifications: [], settings: defaultSettings },
  { id: 'u3', name: 'Charlie Davis', username: 'cdavis', email: 'charlie@example.com', password: 'password123', avatarUrl: 'https://picsum.photos/id/1011/200/200', bio: 'Just a guy writing about code and life.', mood: 'Focused', followers: ['u2'], following: ['u1'], notifications: [], settings: defaultSettings },
  { id: 'u4', name: 'Dana Scully', username: 'danascully', email: 'dana@example.com', password: 'password123', avatarUrl: 'https://picsum.photos/id/20/200/200', bio: 'The truth is out there.', mood: 'Curious', followers: [], following: ['u1'], notifications: [], settings: defaultSettings },
  { id: 'u5', name: 'Ethan Hunt', username: 'ehunt', email: 'ethan@example.com', password: 'password123', avatarUrl: 'https://picsum.photos/id/30/200/200', bio: 'Mission accepted.', mood: 'Energetic', followers: ['u1'], following: [], notifications: [], settings: defaultSettings },
];

const mockComments: Comment[] = [
  { id: 'c1', user: mockUsers[1], content: 'This is so inspiring!', timestamp: '2h ago', likes: ['u3', 'u4'] },
  { id: 'c2', user: mockUsers[2], content: 'Great perspective, I never thought of it that way.', timestamp: '1h ago', likes: ['u1'] },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    user: mockUsers[1],
    content: "Just finished my morning routine: a 5k run, meditation, and a perfect cup of coffee. Feeling ready to conquer the day! It's amazing how a structured start can completely change your mindset. What's one thing you do every morning to set yourself up for success? #MorningRoutine #Productivity",
    timestamp: '15m ago',
    likes: ['u1', 'u3', 'u4', 'u5'],
    comments: mockComments,
    shares: 12,
    mood: 'Productive',
  },
  {
    id: 'p2',
    user: mockUsers[2],
    content: "Spent the afternoon working on a new coding project. I was stuck on a bug for hours, but that 'aha!' moment when you finally figure it out is unbeatable. The persistence always pays off. Here's a little glimpse of my setup today.",
    imageUrl: 'https://picsum.photos/id/2/800/600',
    tags: ['#WorkLife', '#Coding'],
    timestamp: '1h ago',
    likes: ['u1', 'u2', 'u5'],
    comments: [
        { id: 'c3', user: mockUsers[0], content: 'Love the clean setup!', timestamp: '45m ago', likes: ['u2'] },
    ],
    shares: 34,
    mood: 'Focused',
  },
  {
    id: 'p3',
    user: mockUsers[3],
    content: "I've been reading 'Project Hail Mary' by Andy Weir and it's absolutely fantastic. The blend of science, humor, and heart is just perfect. If you're a fan of sci-fi, I can't recommend this enough. Any other book recommendations?",
    timestamp: '3h ago',
    likes: ['u1', 'u2'],
    comments: [],
    shares: 5,
    mood: 'Curious',
  },
  {
    id: 'p4',
    user: mockUsers[0],
    content: "A little poetry I wrote this evening:\n\nThe city sleeps under a blanket of stars,\nWhispering tales of passing cars.\nEach light a dream, a hope, a sigh,\nReflecting life as it rushes by.",
    tags: ['#Poetry'],
    timestamp: '8h ago',
    likes: ['u2', 'u3', 'u4', 'u5'],
    comments: [
        { id: 'c4', user: mockUsers[1], content: 'Beautifully written!', timestamp: '7h ago', likes: ['u1', 'u3'] },
        { id: 'c5', user: mockUsers[2], content: 'This is amazing Alex!', timestamp: '6h ago', likes: ['u1'] },
    ],
    shares: 88,
    mood: 'Creative',
  },
  {
    id: 'p5',
    user: mockUsers[4],
    content: "Just back from a weekend trip to the mountains. The air was so fresh and the views were breathtaking. Sometimes you just need to disconnect to reconnect. #Travel #Nature",
    imageUrl: 'https://picsum.photos/id/1015/800/600',
    tags: ['#TravelDiaries', '#NatureLover'],
    timestamp: '1d ago',
    likes: ['u1', 'u2', 'u3'],
    comments: [],
    shares: 22,
    mood: 'Adventurous'
  },
  {
    id: 'p6',
    user: mockUsers[1],
    content: "Trying out a new recipe tonight - homemade pasta! It's a bit of work but so rewarding. Wish me luck! 🍝 #Foodie #Cooking",
    timestamp: '2d ago',
    likes: ['u1', 'u4', 'u5'],
    comments: [
      { id: 'c6', user: mockUsers[0], content: 'Yum! Send pics!', timestamp: '2d ago', likes: ['u1'] }
    ],
    shares: 15,
    mood: 'Excited'
  }
];

export const mockTrends: Trend[] = [
  { tag: '#MorningRoutine', postCount: 1200 },
  { tag: '#WorkLife', postCount: 980 },
  { tag: '#BookLovers', postCount: 750 },
  { tag: '#TravelDiaries', postCount: 620 },
  { tag: '#TechTalk', postCount: 500 },
];

export const mockCommunities: Community[] = [
  { id: 'com1', name: 'The Writer\'s Corner', memberCount: 12500, imageUrl: 'https://picsum.photos/id/10/50/50' },
  { id: 'com2', name: 'Productivity Hacks', memberCount: 8200, imageUrl: 'https://picsum.photos/id/11/50/50' },
  { id: 'com3', name: 'Sci-Fi Readers', memberCount: 22000, imageUrl: 'https://picsum.photos/id/12/50/50' },
];