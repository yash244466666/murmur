'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Murmur } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useLikeMurmur, useUnlikeMurmur, useDeleteMurmur } from '@/hooks/useMurmurs';
import { formatDate, generateAvatar } from '@/lib/utils';
import { Heart, Trash2 } from 'lucide-react';

interface MurmurCardProps {
    murmur: Murmur;
}

export default function MurmurCard({ murmur }: MurmurCardProps) {
    const { user } = useAuth();
    const likeMurmur = useLikeMurmur();
    const unlikeMurmur = useUnlikeMurmur();
    const deleteMurmur = useDeleteMurmur();

    // Safety check for murmur.user - if missing, don't render the card
    if (!murmur?.user) {
        console.warn('MurmurCard: murmur.user is undefined, skipping render', murmur);
        return null;
    }

    const isOwner = user?.id === murmur.user.id;
    const isLiked = murmur.liked_by_current_user;

    const handleLike = async () => {
        try {
            if (isLiked) {
                await unlikeMurmur.mutateAsync(murmur.id);
            } else {
                await likeMurmur.mutateAsync(murmur.id);
            }
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this murmur?')) {
            try {
                await deleteMurmur.mutateAsync(murmur.id);
            } catch (error) {
                console.error('Failed to delete murmur:', error);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-gray-100">
            <div className="flex items-start space-x-4">
                <div className="relative">
                    <Image
                        src={generateAvatar(murmur.user.username)}
                        alt={`${murmur.user.username} avatar`}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200"
                        unoptimized
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                        <Link
                            href={`/profile/${murmur.user.username}`}
                            className="font-bold text-gray-900 hover:text-blue-600 transition duration-200 text-lg"
                        >
                            @{murmur.user.username}
                        </Link>
                        <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full">
                            {formatDate(murmur.created_at)}
                        </span>
                    </div>
                    <p className="text-gray-800 mb-4 leading-relaxed text-base">
                        {murmur.content}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <button
                            onClick={handleLike}
                            disabled={likeMurmur.isPending || unlikeMurmur.isPending}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${isLiked
                                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                                : 'text-gray-500 hover:bg-red-50 hover:text-red-500'
                                }`}
                        >
                            <Heart
                                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                            />
                            <span className="text-sm font-medium">{murmur.likes_count}</span>
                        </button>

                        {isOwner && (
                            <button
                                onClick={handleDelete}
                                disabled={deleteMurmur.isPending}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-200 hover:scale-105"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Delete</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
