import { User } from "@/supabase/models";

export enum PostStatus {
  Draft = "draft",
  Published = "published"
}

export interface PostDetail {
  answer: string;
  multimediaUrls?: string[];
}

export interface PostItem {
  id: string;
  date: string;
  header: string;
  detail?: PostDetail;
  status: PostStatus;
  topicName?: string;
  topicSlug?: string;
  profile: User;
}
