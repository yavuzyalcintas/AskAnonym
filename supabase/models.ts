/* eslint-disable no-unused-vars */
export interface Topic {
  id: string;
  name: string;
  slug: string;
  created_at: string | null;
}

export interface VerifiedUsers {
  id: string;
  badge_color: string;
  text_color: string;
  type: string;
  created_at: string | null;
}

export interface User {
  id: string;
  updated_at: string | null;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  is_verified: VerifiedUsers | null;
  location: string | null;
  bio: string | null;
  birthdate: string | null;
  horoscope: string | null;
  relationship_status: string | null;
}

export interface Question {
  id: string;
  question: string;
  status: string;
  user_id: string;
  topic_id: string | null;
  created_at: string | null;
  topic: Topic | null;
  user: User;
  is_pinned: boolean;
}

export interface Answer {
  id: string;
  question_id: string;
  answer: string;
  user_id: string;
  created_at: string | null;
  question: Question;
  user: User;
}

export interface AnswerMedia {
  id: string;
  answer_id: string;
  media_url: string;
  user_id: string;
  created_at: string | null;
  answer: Answer;
  user: User;
}

export enum QuestionStatus {
  Draft = "draft",
  Published = "published"
}
