"use client";

import { Topic } from "@/supabase/models";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { notifications } from "@mantine/notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useCallback, useEffect, useState } from "react";
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

  const user = useUser();
  const isOwnerUser = user && user.user_metadata.username === username;

  const ownerUser = useCallback(async () => {
    const { data: ownerUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    setOwnerUserId(ownerUser?.id!);
  }, [username, supabase]);

  useEffect(() => {
    ownerUser();
  }, [ownerUser]);

  async function createQuestion() {
    if (question === "") {
      return notifications.show({
        title: "Geçersiz Soru",
        message: "Lütfen bir soru giriniz.",
        color: "red",
      });
    }
    setIsLoading(true);

    const { error } = await supabase.from("questions").insert({
      question: question!,
      user_id: ownerUserId!,
      topic_id: topic?.id,
    });

    if (!error) {
      setQuestion("");
      notifications.show({
        title: "Soru Gönderildi",
        message: "Sorunuz başarıyla gönderildi.",
        color: "lime",
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      {!isOwnerUser && (
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <div>
                <textarea
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder={
                    "Ask anonymous question " + (topic ? `in #${topic?.name}` : "")
                  }
                />
                <label htmlFor="question" className="text-xs text-gray-500">
                  * questions will be published after user{" "}
                  <span className="text-lime-500 font-bold">approval</span> process.
                </label>
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  size="small"
                  startIcon={<ChatBubbleLeftIcon className="w-5 h-5" />}
                  isLoading={isLoading}
                  onClick={() => createQuestion()}
                >
                  Ask Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AskQuestion;
