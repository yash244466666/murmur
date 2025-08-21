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
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                        maxLength={280}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span
                        className={`text-sm ${remainingChars < 0 ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        {remainingChars} characters remaining
                    </span>
                    <button
                        type="submit"
                        disabled={createMurmur.isPending || remainingChars < 0 || !content.trim()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                    >
                        {createMurmur.isPending ? 'Posting...' : 'Murmur'}
                    </button>
                </div>
            </form>
        </div>
    );
}
