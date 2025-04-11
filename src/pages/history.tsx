// src/pages/history.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { getUserChatSessions } from '../services/supabase';
import { formatDistanceToNow } from 'date-fns';
import Button from '../components/ui/Button';

interface ChatSession {
  id: number;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  completed: boolean;
  session_summary: string | null;
  created_at: string;
}

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { sessions, error } = await getUserChatSessions(user.id);
        if (!error) {
          setSessions(sessions);
        } else {
          console.error('Error fetching sessions:', error);
        }
      } catch (err) {
        console.error('Failed to load sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' • ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatRelativeTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Session History</h1>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calmi-orange"></div>
              </div>
            ) : sessions.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-medium mb-4">No sessions yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You haven't had any therapy sessions yet. Start your first session to begin your wellness journey.
                </p>
                <Button onClick={() => router.push('/session')}>
                  Begin a Session
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {sessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div>
                        <span className="font-medium">
                          Session #{session.id}
                        </span>
                        <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(session.created_at)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatRelativeTime(session.created_at)}
                      </span>
                    </div>
                    
                    <div className="p-6">
                      {session.session_summary ? (
                        <p className="text-gray-700 dark:text-gray-300">
                          {session.session_summary}
                        </p>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">
                          No summary available
                        </p>
                      )}
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            session.completed 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {session.completed ? 'Completed' : 'Incomplete'}
                          </span>
                          <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                            {session.ended_at 
                              ? `Duration: ${Math.round((new Date(session.ended_at).getTime() - new Date(session.started_at).getTime()) / 60000)} minutes` 
                              : 'In progress'}
                          </span>
                        </div>
                        
                        <Button 
                          variant="secondary" 
                          size="small" 
                          onClick={() => router.push(`/session/details/${session.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default HistoryPage;