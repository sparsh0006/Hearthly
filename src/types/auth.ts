// src/types/auth.ts
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: number;
  user_id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  remaining_sessions: number;
  subscription_level: string;
  subscription_ends_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  full_name?: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: Error | null;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  sessions_per_period: number;
  features: string[];
}

export interface Subscription {
  id: number;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}