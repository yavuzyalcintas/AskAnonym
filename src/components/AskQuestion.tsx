"use client";

import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import React, { useCallback, useEffect, useState } from "react";

import { Topic } from "@/supabase/models";

import { generalParse } from "../helpers/parser";
import Button from "./common/button/Button";

interface AskQuestionProps {
  username: string;
  topic?: Topic;
}

function AskQuestion({ username, topic }: AskQuestionProps) {
  const supabase = useSupabaseClient();
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ownerUserId, setOwnerUserId] = useState<string>("");
  const [isPrivateUser, setIsPrivateUser] = useState<boolean>(false);
  const [questionContentLength, setQuestionContentLength] = useState<number>(0);

  const user = useUser();
  const isOwnerUser = user && user.user_metadata.username === username;

  const initUserInfo = useCallback(async () => {
    const { data: ownerUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    setOwnerUserId(ownerUser?.id!);
    setIsPrivateUser(ownerUser?.is_private!);
  }, [username, supabase]);

  useEffect(() => {
    initUserInfo();
  }, [initUserInfo]);

  async function createQuestion() {
    if (isPrivateUser && !user) {
      Notify.info("You must login to ask question");
      return;
    }

    if (question.trim() === "") {
      return;
    }
    const parsedQuestion = generalParse(question);
    if (!parsedQuestion.success) {
      alert("Kurcalamayin la sunu");
      return;
    }
    setIsLoading(true);

    const { error } = await supabase.from("questions").insert({
      question: question!,
      user_id: ownerUserId!,
      topic_id: topic?.id,
      asker_id: isPrivateUser ? user?.id! : undefined
    });

    if (!error) {
      setQuestion("");
      setQuestionContentLength(0);
      Notify.success("Anonymous question sent!");
    }
    setIsLoading(false);
  }

  function canUserAskQuestion() {
    return (isPrivateUser && user) || !isPrivateUser;
  }

  return (
    <>
      {!isOwnerUser && (
        <div className="bg-gray-50 px-4 py-6 dark:bg-slate-700 sm:px-6">
          <div className="flex space-x-3">
            {canUserAskQuestion() && (
              <div className="min-w-0 flex-1">
                <div>
                  <textarea
                    name="question"
                    value={question}
                    onChange={e => {
                      const parsedQuestion = generalParse(e.target.value);
                      if (!parsedQuestion.success) {
                        return;
                      }
                      setQuestion(e.target.value);
                      setQuestionContentLength(e.target.value.length);
                    }}
                    rows={2}
                    maxLength={1000}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:text-gray-100 dark:placeholder:text-gray-400 sm:text-sm"
                    placeholder={
                      "Ask anonymous question " +
                      (topic ? `in #${topic?.name}` : "")
                    }
                  />
                  <label
                    htmlFor="question"
                    className="text-xs  text-gray-500 dark:text-gray-300 "
                  >
                    * questions will be published after user{" "}
                    <span className="font-bold text-cyan-500">approval</span>{" "}
                    process.
                  </label>
                </div>
                <div className="flex justify-end">
                  <label className="text-xs font-bold text-red-600">
                    {questionContentLength}/1000
                  </label>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    size="small"
                    startIcon={<ChatBubbleLeftIcon className="h-5 w-5" />}
                    isLoading={isLoading}
                    onClick={() => createQuestion()}
                  >
                    Ask Question
                  </Button>
                </div>
              </div>
            )}
            {!canUserAskQuestion() && (
              <div className="min-w-0 flex-1">
                <div className="text-center">
                  <label className="text-xs font-bold text-red-600">
                    This user's profile is private. Private users can only accept questions from registered users. Don't worry, your question will be anonymous but user might block your account if he/she doesn't like your question. Please login to ask question.
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AskQuestion;
