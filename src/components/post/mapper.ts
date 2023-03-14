import { Answer, Question } from "@/supabase/models";

import {PostDetail, PostItem, PostStatus} from "./types";

let giphyEmbedRegex =
  /(https?:\/\/)?(www\.)?giphy\.com\/embed\/([a-zA-Z0-9]+)/g;

export function answerToPost(answers: Answer[]): PostItem[] {
  const posts: PostItem[] = [];
  answers.forEach(answer => {
    let rawAnswer = answer.answer;
    const multimediaUrls: string[] = [];
    answer.answer.match(giphyEmbedRegex)?.forEach(match => {
      multimediaUrls.push(match);
      rawAnswer = rawAnswer.replace(match, "");
    });

    let answerDetail: PostDetail = {
      answer: rawAnswer,
      multimediaUrls: multimediaUrls
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
  var posts: PostItem[] = [];

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
