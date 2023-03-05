"use client";

import { Database } from "@/supabase/database";
import { Question, QuestionStatus } from "@/supabase/models";
import { questionQuery } from "@/supabase/queries";
import {
  ChatBubbleBottomCenterIcon,
  EyeSlashIcon,
  ShareIcon,
  TrashIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React, { useState } from "react";
import Moment from "react-moment";
import { generalParse, specialCharacterParse } from "../../helpers/parser";
import Textarea from "../common/textarea/Textarea";
import Avatar from "../global/Avatar";

interface PostProps {
  post: Question;
}

function Post({ post }: PostProps) {
  const supabase = useSupabaseClient<Database>();
  const [question, setQuestion] = useState(post);
  const [showReply, setShowReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  const isOwnerUser = user && user.id === question.user_id;
  const isAnswered = question.answers && question.answers[0];

  async function sendReply() {
    if (!reply) return;
    setIsLoading(true);
    const { error, data: answer } = await supabase.from("answers").insert({
      answer: reply!,
      question_id: question.id,
      user_id: question.user_id,
    });

    if (!error) {
      await supabase
        .from("questions")
        .update({ status: QuestionStatus.Published })
        .eq("id", question.id);

      const { data: newQuestion } = await supabase
        .from("questions")
        .select(questionQuery)
        .eq("id", question.id)
        .single();

      setQuestion(newQuestion as Question);
      setReply("");
      setShowReply(false);
    }

    setIsLoading(false);
  }

  async function deleteQuestion(questionId: string) {
    await supabase.from("answers").delete().eq("question_id", questionId);

    await supabase.from("questions").delete().eq("id", questionId);
  }

  return (
    <article aria-labelledby={"question-title-" + question.id}>
      <div>
        <div className="flex justify-end space-x-3">
          {isAnswered && (
            <>
              <div className="flex-shrink-0 pt-2">
                <Avatar
                  username={question.answers![0].user.username!}
                  url={question.answers![0].user.avatar_url}
                  size={32}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-purple-700">
                  <Link href={question.answers![0].user.username!}>
                    {question.answers![0].user.username}
                  </Link>
                </p>
                <p className="text-xs text-gray-400">
                  <Moment
                    date={question.created_at!}
                    format="YYYY/MM/DD HH:mm"
                  />
                </p>
              </div>
            </>
          )}

          {question.status === QuestionStatus.Draft && (
            <span className="inline-flex items-center rounded-md bg-red-200 px-2.5 py-0.5 text-sm font-semibold text-red-600">
              <EyeSlashIcon className="w-5 h-5 mr-2" />
              {question.status}
            </span>
          )}

          {question.topic && (
            <Link href={`/t/${question.topic.slug}`}>
              <span className="inline-flex items-center rounded-md bg-cyan-200 px-2.5 py-1.5 text-sm font-semibold text-cyan-600">
                <HashtagIcon className="w-5 h-5" />
                {question.topic.name}
              </span>
            </Link>
          )}
        </div>

        <h2
          id={"question-title-" + question.id}
          className="mt-4 text-2xl font-extrabold text-gray-900"
        >
          {question.question}
        </h2>
      </div>
      {isAnswered && (
        <div
          className="mt-2 text-ellipsis overflow-hidden space-y-4 text-base text-gray-500"
          dangerouslySetInnerHTML={{
            __html: question.answers![0].answer,
          }}
        />
      )}
      <div className="mt-6 flex justify-end space-x-8">
        <div className="flex text-sm">
          <span className="inline-flex items-center space-x-4 text-sm">
            {isOwnerUser && (
              <>
                {!isAnswered && (
                  <button
                    type="button"
                    className="inline-flex space-x-1 text-purple-700"
                    onClick={() => setShowReply(!showReply)}
                  >
                    <ChatBubbleBottomCenterIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="font-bold ">Reply</span>
                  </button>
                )}

                <button
                  type="button"
                  className="inline-flex space-x-1 text-red-500"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-bold ">Delete</span>
                </button>
              </>
            )}

            {isAnswered && (
              <button
                type="button"
                className="inline-flex space-x-1 text-gray-400"
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-bold text-gray-600">Share</span>
              </button>
            )}
          </span>
        </div>
      </div>
      {showReply && (
        <Textarea
          placeholder="Send your reply"
          value={reply || ""}
          maxLength={250}
          setValue={(val) => {
            const reply = generalParse(val);
            if (!reply.success) {
              return;
            }
            setReply(reply.data);
          }}
          onSend={() => sendReply()}
          isLoading={isLoading}
        />
      )}
    </article>
  );
}

export default Post;
