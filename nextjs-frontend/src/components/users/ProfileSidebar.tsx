'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useUsers';
import { generateLargeAvatar } from '@/lib/utils';
import { Settings, Edit3, Users, Heart, MessageCircle, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileSidebar() {
    const { user } = useAuth();
    const { data: profileData, isLoading } = useProfile(user?.username || '');
    const [componentLoading, setComponentLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setComponentLoading(false);
        }
    }, [user]);

    if (componentLoading || !user) {
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    const followersCount = profileData?.followers_count || 0;
    const followingCount = profileData?.following_count || 0;

    const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 sticky top-4">
            {/* Header Background */}
            <div className="h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Profile Content */}
            <div className="px-6 pb-6 -mt-12 relative">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <Image
                            src={generateLargeAvatar(user.username)}
                            alt={`${user.username}&apos;s avatar`}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-200"
                            unoptimized
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{user.username}</h2>
                    <p className="text-gray-600 text-sm mb-3">@{user.username.toLowerCase()}</p>

                    {/* Bio */}
                    {user.bio ? (
                        <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
                    ) : (
                        <p className="text-gray-700 text-sm leading-relaxed">
                            Living life one murmur at a time ✨
                        </p>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center group cursor-pointer">
                        <div className="bg-blue-50 group-hover:bg-blue-100 rounded-lg p-3 transition-colors duration-200">
                            <MessageCircle className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">0</div>
                            <div className="text-xs text-gray-600">Murmurs</div>
                        </div>
                    </div>
                    <Link href={`/profile/${user.username}/following`} className="text-center group cursor-pointer">
                        <div className="bg-purple-50 group-hover:bg-purple-100 rounded-lg p-3 transition-colors duration-200">
                            <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">
                                {isLoading ? '...' : followingCount}
                            </div>
                            <div className="text-xs text-gray-600">Following</div>
                        </div>
                    </Link>
                    <Link href={`/profile/${user.username}/followers`} className="text-center group cursor-pointer">
                        <div className="bg-pink-50 group-hover:bg-pink-100 rounded-lg p-3 transition-colors duration-200">
                            <Heart className="w-5 h-5 text-pink-600 mx-auto mb-1" />
                            <div className="text-lg font-bold text-gray-900">
                                {isLoading ? '...' : followersCount}
                            </div>
                            <div className="text-xs text-gray-600">Followers</div>
                        </div>
                    </Link>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Joined {joinedDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Somewhere on Earth 🌍</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 group">
                        <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>Edit Profile</span>
                    </button>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group">
                        <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
