// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import supabase from '../lib/supbase';
import { getCookie, setCookie, removeCookie } from '../lib/cookies';
import { UserProfile } from '../types/auth';
import { Session, User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // First try to load from cookies for faster initial load
    const loadFromCookies = () => {
      const sessionCookie = getCookie('hearthly_session');
      const profileCookie = getCookie('hearthly_profile');
      
      if (sessionCookie) {
        try {
          const parsedSession = JSON.parse(sessionCookie);
          setSession(parsedSession);
          setUser(parsedSession.user);
        } catch (e) {
          // Invalid session cookie, will be refreshed
        }
      }
      
      if (profileCookie) {
        try {
          const parsedProfile = JSON.parse(profileCookie);
          setProfile(parsedProfile);
        } catch (e) {
          // Invalid profile cookie, will be refreshed
        }
      }
    };
    
    loadFromCookies();
    
    // Then load from Supabase for accurate data
    const loadUserData = async () => {
      const { data: { session: supabaseSession } } = await supabase.auth.getSession();
      
      if (supabaseSession) {
        setSession(supabaseSession);
        setUser(supabaseSession.user);
        
        // Store session in cookies
        setCookie('hearthly_session', JSON.stringify(supabaseSession), 7);
        
        // Load user profile
        try {
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', supabaseSession.user.id)
            .single();
            
          if (profileData) {
            setProfile(profileData);
            setCookie('hearthly_profile', JSON.stringify(profileData), 7);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      }
      
      setLoading(false);
    };
    
    loadUserData();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session) {
          setCookie('hearthly_session', JSON.stringify(session), 7);
          
          // Refresh profile data
          try {
            const { data: profileData } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
              
            if (profileData) {
              setProfile(profileData);
              setCookie('hearthly_profile', JSON.stringify(profileData), 7);
            }
          } catch (error) {
            console.error('Error loading user profile:', error);
          }
        } else {
          setProfile(null);
          removeCookie('hearthly_session');
          removeCookie('hearthly_profile');
        }
        
        setLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return { user, session, profile, loading };
};

export default useAuth;