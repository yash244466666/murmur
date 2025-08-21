'use client';

import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-xl font-medium text-gray-600">Loading Murmur...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900">
            <Navbar />
            <main className={`pt-20 ${isAuthenticated ? 'pb-20 md:pb-8' : 'pb-8'}`}>
                <div className="container mx-auto px-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
