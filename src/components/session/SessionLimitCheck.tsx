// src/components/session/SessionLimitCheck.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { checkSessionAvailability } from '../../services/supabase';
import Button from '../ui/Button';

interface SessionLimitCheckProps {
  children: React.ReactNode;
}

const SessionLimitCheck: React.FC<SessionLimitCheckProps> = ({ children }) => {
  const { user, remainingSessions } = useAuth();
  const [hasAvailableSessions, setHasAvailableSessions] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSessions = async () => {
      if (!user) {
        setHasAvailableSessions(false);
        setLoading(false);
        return;
      }

      try {
        // We already have remaining sessions from AuthContext
        setHasAvailableSessions(remainingSessions > 0);
      } catch (error) {
        console.error('Error checking session availability:', error);
        setHasAvailableSessions(false);
      } finally {
        setLoading(false);
      }
    };

    checkSessions();
  }, [user, remainingSessions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calmi-orange"></div>
      </div>
    );
  }

  if (!hasAvailableSessions) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Session Limit Reached</h2>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            You've used all your free sessions. Upgrade to continue accessing Hearthly's services.
          </p>
          
          <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-medium mb-2">Free plan: 0/{remainingSessions === 0 ? 3 : remainingSessions} sessions remaining</p>
            <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full">
              <div className="bg-calmi-orange h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => router.push('/pricing')} 
              className="w-full"
            >
              Upgrade Now
            </Button>
            
            <Button 
              onClick={() => router.push('/')} 
              variant="secondary" 
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SessionLimitCheck;