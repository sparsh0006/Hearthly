// src/services/supabase.ts
import supabase from '../lib/supbase';
import { UserProfile, Subscription } from '../types/auth';

// User Profile Functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId);

  return { error };
}

// src/services/supabase.ts - Update the decrementSessionCount function
export async function decrementSessionCount(userId: string): Promise<number> {
  try {
    // Get current count
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('remaining_sessions')
      .eq('user_id', userId)
      .single();

    if (error || !profile) {
      console.error("Error fetching profile or profile not found:", error);
      
      // Create a profile if it doesn't exist
      const { data: userInfo } = await supabase.auth.getUser(userId);
      const email = userInfo?.user?.email || 'user@example.com';
      
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          email: email,
          remaining_sessions: 2 // Start with 2 after using 1
        })
        .select()
        .single();
        
      if (createError) {
        console.error("Failed to create profile:", createError);
        return 3; // Default to 3 sessions if all else fails
      }
      
      return newProfile?.remaining_sessions || 2;
    }

    const newCount = Math.max(0, profile.remaining_sessions - 1);
    
    // Update the count
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ remaining_sessions: newCount })
      .eq('user_id', userId);
      
    if (updateError) {
      console.error("Error updating remaining sessions:", updateError);
    }

    return newCount;
  } catch (error) {
    console.error("Error in decrementSessionCount:", error);
    return 3; // Default value if there's an error
  }
}

// Chat Session Functions
export async function createChatSession(userId: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      user_id: userId,
      started_at: new Date().toISOString(),
      completed: false
    })
    .select()
    .single();

  return { session: data, error };
}

export async function endChatSession(sessionId: number, summary: string | null = null) {
  const { error } = await supabase
    .from('chat_sessions')
    .update({
      ended_at: new Date().toISOString(),
      completed: true,
      session_summary: summary
    })
    .eq('id', sessionId);

  return { error };
}

export async function getUserChatSessions(userId: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { sessions: data || [], error };
}

export async function getChatSessionMessages(sessionId: number) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  return { messages: data || [], error };
}

export async function addChatMessage(
  sessionId: number,
  sender: 'user' | 'bot',
  message: string,
  audioUrl: string | null = null
) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      session_id: sessionId,
      sender,
      message,
      audio_url: audioUrl,
    })
    .select()
    .single();

  return { message: data, error };
}

// Subscription Functions
export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching user subscription:', error);
    return null;
  }

  return data;
}

export async function checkSessionAvailability(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId);
  
  if (!profile) {
    return false;
  }
  
  return profile.remaining_sessions > 0;
}