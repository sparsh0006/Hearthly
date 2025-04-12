// src/types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: number
          user_id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          remaining_sessions: number
          subscription_level: string
          subscription_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          remaining_sessions?: number
          subscription_level?: string
          subscription_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          remaining_sessions?: number
          subscription_level?: string
          subscription_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: number
          user_id: string
          started_at: string
          ended_at: string | null
          completed: boolean
          session_summary: string | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          started_at?: string
          ended_at?: string | null
          completed?: boolean
          session_summary?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          started_at?: string
          ended_at?: string | null
          completed?: boolean
          session_summary?: string | null
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: number
          session_id: number
          sender: 'user' | 'bot'
          message: string
          audio_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          session_id: number
          sender: 'user' | 'bot'
          message: string
          audio_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          session_id?: number
          sender?: 'user' | 'bot'
          message?: string
          audio_url?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: number
          user_id: string
          plan_id: string
          status: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          plan_id: string
          status?: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          plan_id?: string
          status?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}