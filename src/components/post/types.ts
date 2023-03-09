import { User } from "@/supabase/models";

export enum PostStatus {
  Draft = "draft",
  Published = "published"
}

export interface PostItem {
  id: string;
  date: string;
  header: string;
  detail?: string;
  status: PostStatus;
  topicName?: string;
  topicSlug?: string;
  profile: User;
}
