"use client";

import { Database } from "@/supabase/database";
import { Question } from "@/supabase/models";
import {
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React, { useState } from "react";
import Moment from "react-moment";
import Textarea from "../common/textarea/Textarea";
import Avatar from "../global/Avatar";

interface PostProps {
  question: Question;
}

function Post({ question }: PostProps) {
  const supabase = useSupabaseClient<Database>();
  const [showReply, setShowReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  const isOwnerUser = user && user.id === question.user_id;
  const isAnswered = question.answers && question.answers[0];

  async function sendReply() {
    setIsLoading(true);
    const { error } = await supabase.from("answers").insert({
      answer: reply,
      question_id: question.id,
      user_id: question.user_id,
    });

    if (!error) {
      const { error: statusError } = await supabase
        .from("questions")
        .update({ status: "published" })
        .eq("id", question.id);

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
              <div className="flex-shrink-0">
                <Avatar url={question.answers![0].user.avatar_url} size={32} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-purple-700">
                  <Link href={question.answers![0].user.username}>
                    {question.answers![0].user.username}
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
                  <Moment
                    date={question.created_at!}
                    format="YYYY/MM/DD HH:mm"
                  />
                </p>
              </div>
            </>
          )}

          {question.status === "draft" && (
            <span className="inline-flex items-center rounded-md bg-orange-200 px-2.5 py-0.5 text-sm font-semibold text-orange-600">
              {question.status}
            </span>
          )}
        </div>

        <h2
          id={"question-title-" + question.id}
          className="mt-4 text-lg font-extrabold text-gray-900"
        >
          {question.question}
        </h2>
      </div>
      {isAnswered && (
        <div
          className="mt-2 space-y-4 text-sm text-gray-700"
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

            <button
              type="button"
              className="inline-flex space-x-1 text-gray-400"
            >
              <ShareIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-bold text-gray-500">Share</span>
            </button>
          </span>
        </div>
      </div>
      {showReply && (
        <Textarea
          placeholder="Send your reply"
          value={reply}
          setValue={setReply}
          onSend={() => sendReply()}
          isLoading={isLoading}
        />
      )}
    </article>
  );
}

export default Post;
