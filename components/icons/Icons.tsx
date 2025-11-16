import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, children, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={className || "w-6 h-6"} {...props}>
        {children}
    </svg>
);

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </Icon>
);

export const CompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m-7-8h1m16 0h1M6.343 6.343l.707.707m10.607 10.607l.707.707M6.343 17.657l.707-.707m10.607-10.607l.707-.707" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12l-3-3-3 3 3 3 3-3z" />
    </Icon>
);

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.133-1.272-.37-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.133-1.272.37-1.857m0 0a5.002 5.002 0 019.26 0M12 14a5 5 0 100-10 5 5 0 000 10z" />
    </Icon>
);

export const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon className="w-5 h-5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </Icon>
);

export const CogIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon className="w-5 h-5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </Icon>
);

export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon className="w-5 h-5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </Icon>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></Icon>;
export const BookmarkIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></Icon>;
export const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></Icon>;
export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>;
export const ThumbsUpIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2v8m-7-8h2.5" /></Icon>;
export const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></Icon>;
export const Share2Icon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></Icon>;
export const MoreHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></Icon>;
export const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></Icon>;
export const TagIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM11 11L21 3" /></Icon>;
export const XIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>;
export const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></Icon>;
export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => <Icon className="w-5 h-5" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></Icon>;


export const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </Icon>
);

export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </Icon>
);

export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </Icon>
);