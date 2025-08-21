'use client';

import { SuggestedUser } from '@/types';
import { useFollowUser, useUnfollowUser } from '@/hooks/useUsers';
import { generateAvatar } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface SuggestedUserCardProps {
    user: SuggestedUser;
}

export default function SuggestedUserCard({ user }: SuggestedUserCardProps) {
    const followUser = useFollowUser();
    const unfollowUser = useUnfollowUser();

    const handleFollowToggle = async () => {
        try {
            if (user.following) {
                await unfollowUser.mutateAsync(user.id);
            } else {
                await followUser.mutateAsync(user.id);
            }
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };

    return (
        <div className="flex items-center justify-between py-2">
            <Link
                href={`/profile/${user.username}`}
                className="flex items-center space-x-3 flex-1 min-w-0"
            >
                <Image
                    src={generateAvatar(user.username)}
                    alt={`${user.username} avatar`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                />
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 truncate">@{user.username}</p>
                    {user.bio && (
                        <p className="text-sm text-gray-500 truncate">{user.bio}</p>
                    )}
                </div>
            </Link>

            <button
                onClick={handleFollowToggle}
                disabled={followUser.isPending || unfollowUser.isPending}
                className={`ml-2 px-3 py-1 text-sm rounded-full transition duration-150 disabled:opacity-50 ${user.following
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
            >
                {followUser.isPending || unfollowUser.isPending
                    ? 'Loading...'
                    : user.following
                        ? 'Unfollow'
                        : 'Follow'
                }
            </button>
        </div>
    );
}
