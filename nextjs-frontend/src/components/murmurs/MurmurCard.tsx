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
        <div className="bg-white rounded-lg shadow p-6 mb-4">
            <div className="flex items-start space-x-3">
                <Image
                    src={generateAvatar(murmur.user.username)}
                    alt={`${murmur.user.username} avatar`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                        <Link
                            href={`/profile/${murmur.user.username}`}
                            className="font-bold text-gray-900 hover:text-blue-500 transition duration-150"
                        >
                            @{murmur.user.username}
                        </Link>
                        <span className="text-gray-500 text-sm">
                            {formatDate(murmur.created_at)}
                        </span>
                    </div>
                    <p className="text-gray-800 mb-3 whitespace-pre-wrap">
                        {murmur.content}
                    </p>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleLike}
                            disabled={likeMurmur.isPending || unlikeMurmur.isPending}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-full transition duration-150 ${isLiked
                                    ? 'text-red-500 hover:bg-red-50'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-red-500'
                                }`}
                        >
                            <Heart
                                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                            />
                            <span className="text-sm">{murmur.likes_count}</span>
                        </button>

                        {isOwner && (
                            <button
                                onClick={handleDelete}
                                disabled={deleteMurmur.isPending}
                                className="flex items-center space-x-1 px-2 py-1 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-full transition duration-150"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm">Delete</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
