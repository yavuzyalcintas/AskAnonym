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
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          username: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          username?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          username?: string | null;
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
          is_pinned: boolean;
        };
        Insert: {
          id?: string;
          question: string;
          status?: string;
          user_id: string;
          topic_id?: string | null;
          created_at?: string | null;
          is_pinned?: boolean;
        };
        Update: {
          id?: string;
          question?: string;
          status?: string;
          user_id?: string;
          topic_id?: string | null;
          created_at?: string | null;
          is_pinned?: boolean;
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
      top_topics: {
        Row: {
          id: string | null;
          name: string | null;
          slug: string | null;
          count: number | null;
        };
      };
      top_users: {
        Row: {
          username: string | null;
          avatar_url: string | null;
          count: number | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
