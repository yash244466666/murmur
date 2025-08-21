'use client';

import { useParams } from 'next/navigation';
import { useProfile, useFollowUser, useUnfollowUser } from '@/hooks/useUsers';
import { useAuth } from '@/contexts/AuthContext';
import { generateAvatar, formatDate } from '@/lib/utils';
import MurmurCard from '@/components/murmurs/MurmurCard';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Calendar } from 'lucide-react';

export default function ProfilePage() {
    const params = useParams();
    const username = params.username as string;
    const { user: currentUser } = useAuth();
    const { data: profileData, isLoading, error } = useProfile(username);
    const followUser = useFollowUser();
    const unfollowUser = useUnfollowUser();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-lg">Loading profile...</div>
            </div>
        );
    }

    if (error || !profileData) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-lg text-red-500">Profile not found</div>
            </div>
        );
    }

    const { user, murmurs_count, followers_count, following_count, is_following, murmurs } = profileData;
    const isOwnProfile = currentUser?.id === user.id;

    const handleFollowToggle = async () => {
        try {
            if (is_following) {
                await unfollowUser.mutateAsync(user.id);
            } else {
                await followUser.mutateAsync(user.id);
            }
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-start space-x-4">
                    <Image
                        src={generateAvatar(user.username)}
                        alt={`${user.username} avatar`}
                        width={120}
                        height={120}
                        className="w-30 h-30 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">@{user.username}</h1>
                                {user.bio && (
                                    <p className="text-gray-600 mt-1">{user.bio}</p>
                                )}
                                <div className="flex items-center text-gray-500 text-sm mt-2">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>Joined {formatDate(user.created_at)}</span>
                                </div>
                            </div>
                            {!isOwnProfile && (
                                <button
                                    onClick={handleFollowToggle}
                                    disabled={followUser.isPending || unfollowUser.isPending}
                                    className={`px-4 py-2 rounded-full font-medium transition duration-150 disabled:opacity-50 ${is_following
                                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    {followUser.isPending || unfollowUser.isPending
                                        ? 'Loading...'
                                        : is_following
                                            ? 'Unfollow'
                                            : 'Follow'
                                    }
                                </button>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex space-x-6 text-sm">
                            <div className="text-center">
                                <p className="font-bold text-gray-900">{murmurs_count}</p>
                                <p className="text-gray-600">Murmurs</p>
                            </div>
                            <Link
                                href={`/profile/${username}/followers`}
                                className="text-center hover:text-blue-500 transition duration-150"
                            >
                                <p className="font-bold text-gray-900">{followers_count}</p>
                                <p className="text-gray-600">Followers</p>
                            </Link>
                            <Link
                                href={`/profile/${username}/following`}
                                className="text-center hover:text-blue-500 transition duration-150"
                            >
                                <p className="font-bold text-gray-900">{following_count}</p>
                                <p className="text-gray-600">Following</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Murmurs */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Murmurs</h2>
                {murmurs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">
                            {isOwnProfile ? "You haven't posted any murmurs yet" : `@${username} hasn't posted any murmurs yet`}
                        </p>
                    </div>
                ) : (
                    murmurs.map((murmur) => (
                        <MurmurCard key={murmur.id} murmur={murmur} />
                    ))
                )}
            </div>
        </div>
    );
}
