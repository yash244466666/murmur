'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    console.log(info);
    setDebugInfo(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    addDebugInfo(`Auth state - Loading: ${authLoading}, Authenticated: ${isAuthenticated}, User: ${user?.username || 'null'}`);
  }, [authLoading, isAuthenticated, user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      addDebugInfo('Redirecting to login - user not authenticated');
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, @{user?.username}!</h1>
        <p className="text-gray-600 mb-4">You are successfully logged in.</p>

        {/* Debug Information */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <div className="space-y-1 text-sm font-mono">
            {debugInfo.map((info, index) => (
              <div key={index}>{info}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Timeline Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Timeline</h2>
        <p className="text-gray-500">Timeline functionality will be restored once login issues are resolved.</p>
      </div>
    </div>
  );
}
