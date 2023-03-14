import { Answer, Question } from "@/supabase/models";

import { PostDetail, PostItem, PostStatus } from "./types";

export function answerToPost(answers: Answer[]): PostItem[] {
  const posts: PostItem[] = [];
  answers?.forEach(answer => {
    let answerDetail: PostDetail = {
      answer: answer.answer,
      multimediaUrls: answer.answer_media?.map(media => media.media_url) ?? []
    };

    posts.push({
      date: answer.created_at!,
      header: answer.question.question,
      id: answer.question_id,
      status: answer.question.status as PostStatus,
      detail: answerDetail,
      topicName: answer.question.topic?.name,
      topicSlug: answer.question.topic?.slug,
      profile: answer.user
    });
  });

  return posts;
}

export function questionToPost(questions: Question[]): PostItem[] {
  const posts: PostItem[] = [];

  questions.forEach(question => {
    posts.push({
      date: question.created_at!,
      header: question.question,
      id: question.id,
      status: question.status as PostStatus,
      profile: question.user
    });
  });

  return posts;
}
