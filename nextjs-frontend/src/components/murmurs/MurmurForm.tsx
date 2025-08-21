'use client';

import { useState } from 'react';
import { useCreateMurmur } from '@/hooks/useMurmurs';
import { validateMurmur } from '@/lib/utils';

export default function MurmurForm() {
    const [content, setContent] = useState('');
    const createMurmur = useCreateMurmur();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateMurmur(content);
        if (!validation.isValid) {
            alert(validation.error);
            return;
        }

        try {
            await createMurmur.mutateAsync({ content });
            setContent('');
        } catch (error) {
            console.error('Failed to create murmur:', error);
        }
    };

    const remainingChars = 280 - content.length;

    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Share your thoughts</h2>
                <p className="text-gray-600 text-sm">What&apos;s on your mind today?</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening? Share something interesting..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                        rows={4}
                        maxLength={280}
                    />
                    <div className="absolute bottom-3 right-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${remainingChars < 20 ? 'bg-red-100 text-red-600' :
                                remainingChars < 50 ? 'bg-yellow-100 text-yellow-600' :
                                    'bg-green-100 text-green-600'
                            }`}>
                            {remainingChars}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span
                        className={`text-sm font-medium ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        {remainingChars < 20 ? `Only ${remainingChars} characters left!` : `${remainingChars} characters remaining`}
                    </span>
                    <button
                        type="submit"
                        disabled={createMurmur.isPending || remainingChars < 0 || !content.trim()}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                    >
                        {createMurmur.isPending ? (
                            <span className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Posting...</span>
                            </span>
                        ) : (
                            '✨ Share Murmur'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
