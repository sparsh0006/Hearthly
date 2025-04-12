import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import supabase from '../lib/supbase';
import { setCookie, getCookie, removeCookie } from '../lib/cookies';
import { getUserProfile } from '../services/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{
    error: any | null;
    data: User | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  updateProfile: (data: any) => Promise<{ error: any | null }>;
  remainingSessions: number;
  updateRemainingSessions: (sessions: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [remainingSessions, setRemainingSessions] = useState(3); // Default limit for free users
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      
      // First try to get session from Supabase
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      
      if (supabaseSession) {
        console.log("Found session:", supabaseSession.user.id);
        setSession(supabaseSession);
        setUser(supabaseSession.user);
        
        // Get user profile and session count
        try {
          const profile = await getUserProfile(supabaseSession.user.id);
          if (profile) {
            setRemainingSessions(profile.remaining_sessions);
          } else {
            // Create a profile if it doesn't exist
            const { error } = await supabase.from('user_profiles').insert({
              user_id: supabaseSession.user.id,
              email: supabaseSession.user.email || '',
              remaining_sessions: 3
            });
            
            if (error) {
              console.error("Failed to create user profile:", error);
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        console.log("No session found");
      }
      
      setLoading(false);
    };
    
    initAuth();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state changed:", _event, session?.user?.id);
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          try {
            const profile = await getUserProfile(session.user.id);
            if (profile) {
              setRemainingSessions(profile.remaining_sessions);
            }
          } catch (error) {
            console.error("Error fetching user profile after auth change:", error);
          }
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Update remaining sessions in both state and database
  const updateRemainingSessions = async (sessions: number) => {
    setRemainingSessions(sessions);
    
    if (user) {
      try {
        const { error } = await supabase
          .from('user_profiles')
          .update({ remaining_sessions: sessions })
          .eq('user_id', user.id);
        
        if (error) {
          console.error("Failed to update remaining sessions:", error);
        }
      } catch (error) {
        console.error("Error updating sessions:", error);
      }
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: any | null; data: Session | null }> => {
      console.log("Attempting sign in for:", email);
      const response = await supabase.auth.signInWithPassword({ email, password });
      
      console.log("Sign in response:", response);
      
      if (!response.error && response.data.session) {
        // Fetch user profile
        try {
          const profile = await getUserProfile(response.data.session.user.id);
          if (profile) {
            setRemainingSessions(profile.remaining_sessions);
          }
        } catch (error) {
          console.error("Error fetching user profile after sign in:", error);
        }
      }
      
      return {
        error: response.error,
        data: response.data.session || null,
      };
    };

const signUp = async (email: string, password: string, metadata = {}): Promise<{ error: any | null; data: User | null }> => {
  console.log("Attempting sign up for:", email);
  const response = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata }
  });

  console.log("Sign up response:", response);

  // With the trigger function above, we shouldn't need to manually create a profile
  // But keep this as a fallback with improved error handling
  if (!response.error && response.data.user) {
    try {
      // Check if profile already exists (it should be created by the trigger)
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', response.data.user.id)
        .single();
      
      if (!existingProfile) {
        // If trigger didn't work, try to create profile manually
        await supabase.auth.getSession(); // Make sure we have the latest session
        
        const { error } = await supabase
          .from('user_profiles')
          .insert({
            user_id: response.data.user.id,
            remaining_sessions: 3,
            email,
            ...metadata
          });
        
        if (error) {
          console.error("Failed to create user profile after signup:", error);
        }
      }
    } catch (error) {
      console.error("Error checking/creating profile after signup:", error);
    }
  }

  return {
    error: response.error,
    data: response.data.user || null,
  };
};

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRemainingSessions(3);
    router.push('/');
  };

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  };

  const updateProfile = async (data: any) => {
    if (!user) return { error: new Error('No user logged in') };

    return await supabase
      .from('user_profiles')
      .update(data)
      .eq('user_id', user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        remainingSessions,
        updateRemainingSessions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};