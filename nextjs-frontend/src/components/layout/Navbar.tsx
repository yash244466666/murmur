'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/hooks/useAuth';
import { Share, Home, User, LogOut, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const logout = useLogout();

    return (
        <nav className="bg-blue-500 shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                <Link
                    href="/"
                    className="text-white text-2xl font-bold hover:text-blue-100 transition duration-150 inline-flex items-center"
                >
                    <Share className="w-8 h-8 mr-2" />
                    <span>Murmur</span>
                </Link>

                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/"
                                className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg inline-flex items-center transition duration-150"
                            >
                                <Home className="w-5 h-5 mr-2" />
                                <span>Timeline</span>
                            </Link>
                            <Link
                                href={`/profile/${user?.username}`}
                                className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg inline-flex items-center transition duration-150"
                            >
                                <User className="w-5 h-5 mr-2" />
                                <span>Profile</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg inline-flex items-center bg-transparent border-0 transition duration-150"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                <span>Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg inline-flex items-center transition duration-150"
                            >
                                <LogIn className="w-5 h-5 mr-2" />
                                <span>Sign In</span>
                            </Link>
                            <Link
                                href="/signup"
                                className="text-white hover:bg-blue-600 px-4 py-2 rounded-lg inline-flex items-center transition duration-150"
                            >
                                <UserPlus className="w-5 h-5 mr-2" />
                                <span>Sign Up</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
