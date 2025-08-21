'use client';

import { useParams } from 'next/navigation';
import { useFollowers } from '@/hooks/useUsers';
import { generateAvatar } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users } from 'lucide-react';

export default function FollowersPage() {
    const params = useParams();
    const username = params.username as string;
    const { data: followersData, isLoading, error } = useFollowers(username);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-lg">Loading followers...</div>
            </div>
        );
    }

    if (error || !followersData) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-lg text-red-500">Error loading followers</div>
            </div>
        );
    }

    const { user, followers } = followersData;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                    <Link
                        href={`/profile/${username}`}
                        className="p-2 hover:bg-gray-100 rounded-full transition duration-150"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold">@{user.username}</h1>
                        <p className="text-gray-600">{followers.length} Followers</p>
                    </div>
                </div>
            </div>

            {/* Followers List */}
            <div className="bg-white rounded-lg shadow">
                {followers.length === 0 ? (
                    <div className="p-6 text-center">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No followers yet</p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {followers.map((follower) => (
                            <div key={follower.id} className="p-4 hover:bg-gray-50 transition duration-150">
                                <Link
                                    href={`/profile/${follower.username}`}
                                    className="flex items-center space-x-3"
                                >
                                    <Image
                                        src={generateAvatar(follower.username)}
                                        alt={`${follower.username} avatar`}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate">@{follower.username}</p>
                                        {follower.bio && (
                                            <p className="text-sm text-gray-500 truncate">{follower.bio}</p>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
