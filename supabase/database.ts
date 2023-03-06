/* eslint-disable no-unused-vars */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
        };
      };
      user_topics: {
        Row: {
          id: string;
          topic_id: string;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          topic_id: string;
          user_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          topic_id?: string;
          user_id?: string;
          created_at?: string | null;
        };
      };
      topics: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string | null;
        };
      };
      questions: {
        Row: {
          id: string;
          question: string;
          status: string;
          user_id: string;
          topic_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          question: string;
          status?: string;
          user_id: string;
          topic_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          question?: string;
          status?: string;
          user_id?: string;
          topic_id?: string | null;
          created_at?: string | null;
        };
      };
      answers: {
        Row: {
          id: string;
          question_id: string;
          answer: string;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          question_id: string;
          answer: string;
          user_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          question_id?: string;
          answer?: string;
          user_id?: string;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
