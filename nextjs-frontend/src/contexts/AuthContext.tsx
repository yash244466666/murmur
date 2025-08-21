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
        console.log('🔧 AuthContext: Component mounting');
        setMounted(true);
        // Check for stored user on component mount
        const storedUser = authUtils.getCurrentUser();
        const token = authUtils.getAuthToken();

        console.log('🔧 AuthContext: Initial check - Token:', !!token, 'User:', !!storedUser);
        console.log('🔧 AuthContext: Token value:', token ? token.substring(0, 20) + '...' : 'NULL');
        console.log('🔧 AuthContext: User data:', storedUser ? storedUser.username : 'NULL');

        if (storedUser && token) {
            console.log('✅ AuthContext: Found valid auth data, setting user');
            setUser(storedUser);
        } else {
            console.log('❌ AuthContext: No valid auth data found');
        }
        setLoading(false);
        console.log('🔧 AuthContext: Loading set to false');
    }, []);

    const login = (userData: User, token: string) => {
        console.log('🔐 AuthContext: Login called with:', { username: userData.username, tokenLength: token.length });
        authUtils.setAuthToken(token);
        authUtils.setCurrentUser(userData);
        setUser(userData);
        console.log('✅ AuthContext: Login complete, user set');
    };

    const logout = () => {
        console.log('🚪 AuthContext: Logout called');
        authUtils.removeAuthToken();
        setUser(null);
        console.log('✅ AuthContext: Logout complete');
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
