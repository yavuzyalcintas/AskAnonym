"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import Button from "./common/button/Button";

interface PostProps {
  question: string;
  answer?: string;
  date: string | null;
  username: string;
}

function Post({ date, question, username, answer }: PostProps) {
  const [showReply, setShowReply] = useState<boolean>(false);
  const user = useUser();
  const isOwnerUser = user && user.user_metadata.username === username;

  return (
    <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg px-4 py-6 sm:px-6">
      <div className="flex space-x-3 w-full">
        <div>
          <div className="mt-1 text-sm text-gray-700">
            <p>{question}</p>
          </div>
          <div className="mt-2 space-x-2 text-sm">
            <span className="font-medium text-xs text-gray-500">
              {new Date(date!).toLocaleDateString()}
            </span>{" "}
            {isOwnerUser && (
              <>
                <span className="font-medium text-gray-500">&middot;</span>{" "}
                <button
                  type="button"
                  className="font-medium text-purple-700"
                  onClick={() => setShowReply(!showReply)}
                >
                  Reply
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {answer && (
        <div className="flex justify-end space-x-3 ml-8">
          <div>
            <div className="text-sm text-right font-bold text-purple-700">
              {username}
            </div>
            <div>
              <div className="mt-1 text-sm text-gray-700">
                <p>{answer}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOwnerUser && showReply && (
        <div className="pt-2">
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <div>
                <label htmlFor="reply" className="sr-only">
                  About
                </label>
                <textarea
                  id="reply"
                  name="reply"
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  placeholder="Reply question"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <Button
                  size="small"
                  startIcon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
