'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/hooks/useAuth';
import { generateAvatar } from '@/lib/utils';
import { Share, Home, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const logout = useLogout();

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-gray-900 text-2xl font-bold hover:text-blue-600 transition-all duration-200 inline-flex items-center group"
                >
                    <div className="relative">
                        <Share className="w-8 h-8 mr-3 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 scale-150 group-hover:animate-ping"></div>
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Murmur
                    </span>
                </Link>

                {/* Navigation Items */}
                <div className="flex items-center gap-1">
                    {isAuthenticated ? (
                        <>
                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1">
                                <Link
                                    href="/"
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl inline-flex items-center transition-all duration-200 group"
                                >
                                    <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="font-medium">Home</span>
                                </Link>

                                <Link
                                    href={`/profile/${user?.username}`}
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl inline-flex items-center transition-all duration-200 group"
                                >
                                    <User className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="font-medium">Profile</span>
                                </Link>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="flex items-center gap-3 ml-2">
                                <div className="relative group">
                                    <Link
                                        href={`/profile/${user?.username}`}
                                        className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-xl transition-all duration-200"
                                    >
                                        <Image
                                            src={generateAvatar(user?.username || '')}
                                            alt={`${user?.username} avatar`}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200"
                                            unoptimized
                                        />
                                        <span className="hidden lg:block font-medium text-gray-900 group-hover:text-blue-600">
                                            {user?.username}
                                        </span>
                                    </Link>
                                </div>

                                <div className="h-8 w-px bg-gray-200"></div>

                                <button
                                    onClick={logout}
                                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all duration-200 group"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl inline-flex items-center transition-all duration-200 group font-medium"
                            >
                                <LogIn className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                <span>Sign In</span>
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-xl inline-flex items-center transition-all duration-200 group font-medium shadow-md hover:shadow-lg"
                            >
                                <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                                <span>Sign Up</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation (bottom bar for authenticated users) */}
            {isAuthenticated && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                    <div className="grid grid-cols-3 gap-1 p-2">
                        <Link
                            href="/"
                            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                            <Home className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">Home</span>
                        </Link>
                        <Link
                            href={`/profile/${user?.username}`}
                            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        >
                            <User className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">Profile</span>
                        </Link>
                        <button
                            onClick={logout}
                            className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-red-600 transition-colors duration-200"
                        >
                            <LogOut className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">Exit</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
