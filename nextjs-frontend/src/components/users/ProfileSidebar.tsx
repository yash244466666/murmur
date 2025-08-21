'use client';

import { useAuth } from '@/contexts/AuthContext';
import { generateAvatar } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface ProfileSidebarProps {
    followersCount: number;
    followingCount: number;
}

export default function ProfileSidebar({ followersCount, followingCount }: ProfileSidebarProps) {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Image
                        src={generateAvatar(user.username)}
                        alt={`${user.username} avatar`}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <p className="font-bold text-lg">@{user.username}</p>
                        {user.bio && (
                            <p className="text-gray-600">{user.bio}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between text-sm">
                    <div>
                        <Link
                            href={`/profile/${user.username}/followers`}
                            className="hover:text-blue-500 block"
                        >
                            <p className="font-bold text-gray-900">{followersCount}</p>
                            <p className="text-gray-600">Followers</p>
                        </Link>
                    </div>
                    <div>
                        <Link
                            href={`/profile/${user.username}/following`}
                            className="hover:text-blue-500 block"
                        >
                            <p className="font-bold text-gray-900">{followingCount}</p>
                            <p className="text-gray-600">Following</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
