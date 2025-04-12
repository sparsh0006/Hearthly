import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { getUserProfile, updateUserProfile } from '../services/supabase';
import { UserProfile } from '../types/auth';

const ProfilePage: React.FC = () => {
  const { user, remainingSessions } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const profileData = await getUserProfile(user.id);
        if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || '');
          setEmail(profileData.email);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await updateUserProfile(user.id, {
        full_name: fullName,
        email
      });

      if (error) {
        setUpdateMessage('Failed to update profile');
      } else {
        setUpdateMessage('Profile updated successfully');
        setIsEditing(false);
        
        // Update the profile state
        setProfile(prev => {
          if (!prev) return null;
          return { ...prev, full_name: fullName, email };
        });
      }
    } catch (error) {
      setUpdateMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calmi-orange"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {updateMessage && (
                <div className={`mb-4 p-3 rounded-md ${
                  updateMessage.includes('success') 
                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' 
                    : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
                }`}>
                  {updateMessage}
                </div>
              )}
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">Account Information</h2>
                      <Button 
                        variant="secondary" 
                        size="small" 
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                        <p className="font-medium">{profile?.full_name || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium">{profile?.email || user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-medium mb-4">Subscription</h2>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Current Plan:</span>
                        <span className="bg-calmi-orange text-black px-2 py-1 rounded text-sm">
                          Free
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        You have {remainingSessions}/3 sessions remaining this month
                      </p>
                      <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full">
                        <div 
                          className="bg-calmi-orange h-2 rounded-full" 
                          style={{ width: `${(remainingSessions / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => window.location.href = '/pricing'} 
                      className="w-full"
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default ProfilePage;