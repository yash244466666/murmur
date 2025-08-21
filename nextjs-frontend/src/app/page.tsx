'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTimeline } from '@/hooks/useMurmurs';
import MurmurForm from '@/components/murmurs/MurmurForm';
import MurmurCard from '@/components/murmurs/MurmurCard';
import ProfileSidebar from '@/components/users/ProfileSidebar';
import SuggestedUserCard from '@/components/users/SuggestedUserCard';

export default function HomePage() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const router = useRouter();
  const { data: timelineData, isLoading, error } = useTimeline();

  useEffect(() => {
    console.log('🏠 HomePage: Auth state changed - Loading:', authLoading, 'Authenticated:', isAuthenticated);
    // Only redirect if auth is loaded and user is not authenticated
    if (!authLoading && !isAuthenticated) {
      console.log('🚪 HomePage: Redirecting to login - user not authenticated');
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg text-gray-900">Loading...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated (while redirecting)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg text-gray-900">Redirecting to login...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg text-gray-900">Loading timeline...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg text-red-600">Error loading timeline: {error.message}</div>
      </div>
    );
  }

  const murmurs = timelineData?.murmurs || [];
  const suggestedUsers = timelineData?.suggested_users || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        <ProfileSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* New Murmur Form */}
        <MurmurForm />

        {/* Timeline */}
        <div className="space-y-4">
          {murmurs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No murmurs yet. Start following people or create your first murmur!</p>
            </div>
          ) : (
            murmurs.map((murmur) => (
              <MurmurCard key={murmur.id} murmur={murmur} />
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-4">Who to Follow</h2>
          <div className="space-y-4">
            {suggestedUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No suggestions available</p>
            ) : (
              suggestedUsers.map((suggestedUser) => (
                <SuggestedUserCard key={suggestedUser.id} user={suggestedUser} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}