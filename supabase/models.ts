/* eslint-disable no-unused-vars */
export interface Topic {
  id: string;
  name: string;
  slug: string;
  created_at: string | null;
}

export interface User {
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

export interface Answer {
  id: string;
  question_id: string;
  answer: string;
  user_id: string;
  created_at: string | null;
  user: User;
}

export interface Question {
  id: string;
  question: string;
  status: string;
  user_id: string;
  topic_id: string | null;
  created_at: string | null;
  answers: Answer[] | null;
  topic: Topic | null;
}

export enum QuestionStatus {
  Draft = "draft",
  Published = "published"
}
