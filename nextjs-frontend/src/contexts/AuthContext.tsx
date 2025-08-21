'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { authUtils } from '@/lib/utils';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check for stored user on component mount
        const storedUser = authUtils.getCurrentUser();
        const token = authUtils.getAuthToken();

        if (storedUser && token) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        console.log('AuthContext: Setting user and token', { userData, token });
        authUtils.setAuthToken(token);
        authUtils.setCurrentUser(userData);
        setUser(userData);
    };

    const logout = () => {
        console.log('AuthContext: Logging out user');
        authUtils.removeAuthToken();
        setUser(null);
    };

    // Don't render children until mounted to prevent hydration issues
    if (!mounted) {
        return <div>Loading...</div>;
    }

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
