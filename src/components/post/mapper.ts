import { Answer, Question } from "@/supabase/models";

import { PostItem, PostStatus } from "./types";

export function answerToPost(answers: Answer[]): PostItem[] {
  var posts: PostItem[] = [];
  answers.forEach(answer => {
    posts.push({
      avatarUrl: answer.user.avatar_url!,
      date: answer.created_at!,
      header: answer.question.question,
      id: answer.question_id,
      status: answer.question.status as PostStatus,
      userId: answer.user_id,
      username: answer.user.username,
      detail: answer.answer,
      topicName: answer.question.topic?.name,
      topicSlug: answer.question.topic?.slug
    });
  });

  return posts;
}

export function questionToPost(questions: Question[]): PostItem[] {
  var posts: PostItem[] = [];

  questions.forEach(question => {
    posts.push({
      avatarUrl: question.user.avatar_url!,
      date: question.created_at!,
      header: question.question,
      id: question.id,
      status: question.status as PostStatus,
      userId: question.user_id,
      username: question.user.username
    });
  });

  return posts;
}
