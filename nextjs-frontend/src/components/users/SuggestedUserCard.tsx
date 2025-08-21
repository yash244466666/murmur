'use client';

import { SuggestedUser } from '@/types';
import { useFollowUser, useUnfollowUser } from '@/hooks/useUsers';
import { generateAvatar } from '@/lib/utils';
import { UserPlus, UserMinus } from 'lucide-react';
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

    const isLoading = followUser.isPending || unfollowUser.isPending;

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100">
            <div className="flex items-center space-x-4">
                <Link
                    href={`/profile/${user.username}`}
                    className="flex-shrink-0"
                >
                    <div className="relative">
                        <Image
                            src={generateAvatar(user.username)}
                            alt={`${user.username} avatar`}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200"
                            unoptimized
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                </Link>

                <div className="flex-1 min-w-0">
                    <Link
                        href={`/profile/${user.username}`}
                        className="block"
                    >
                        <p className="font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 truncate">
                            @{user.username}
                        </p>
                        {user.bio && (
                            <p className="text-sm text-gray-600 truncate mt-1">
                                {user.bio}
                            </p>
                        )}
                    </Link>
                </div>

                <button
                    onClick={handleFollowToggle}
                    disabled={isLoading}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${user.following
                            ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : user.following ? (
                        <UserMinus className="w-4 h-4" />
                    ) : (
                        <UserPlus className="w-4 h-4" />
                    )}
                    <span>
                        {isLoading ? 'Loading...' : user.following ? 'Unfollow' : 'Follow'}
                    </span>
                </button>
            </div>
        </div>
    );
}
