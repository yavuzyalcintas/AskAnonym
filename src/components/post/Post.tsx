"use client";

import {
  ChatBubbleBottomCenterIcon,
  EyeSlashIcon,
  HashtagIcon,
  LinkIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React, { useState } from "react";
import Moment from "react-moment";

import MultimediaTextarea from "@/src/components/common/textarea/MultimediaTextarea";
import { Database } from "@/supabase/database";
import { Answer, QuestionStatus } from "@/supabase/models";
import { answerQuery } from "@/supabase/queries";

import UserCard from "../global/UserCard";
import { answerToPost } from "./mapper";
import { PostItem, PostStatus } from "./types";

interface PostProps {
  item: PostItem;
  onDelete: (id: string) => void;
}

function Post({ item, onDelete }: PostProps) {
  const supabase = useSupabaseClient<Database>();
  const [post, setPost] = useState(item);

  const [showReply, setShowReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string | undefined>("");
  const [replyMediaUrls, setReplyMediaUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useUser();

  const isOwnerUser = user && user.id === post.profile.id;

  async function insertReplyMediaUrls(answer: string) {
    if (!replyMediaUrls.length) return;

    answer.concat(" " + replyMediaUrls.join(" "));

    setReplyMediaUrls([]);
  }

  async function sendReply(questionId: string, reply: string) {
    if (!reply) return;
    setIsLoading(true);

    await insertReplyMediaUrls(reply);

    const { error, data: answerVal } = await supabase
      .from("answers")
      .insert({
        answer: reply!,
        question_id: questionId,
        user_id: post.profile.id
      })
      .select("*")
      .maybeSingle();

    if (!error) {
      await supabase
        .from("questions")
        .update({ status: QuestionStatus.Published })
        .eq("id", questionId);

      const { data: newAnswer } = await supabase
        .from("answers")
        .select(answerQuery)
        .eq("id", answerVal!.id)
        .single();

      setPost(answerToPost([newAnswer as Answer])[0]);

      setShowReply(false);
      setReply(undefined);
    }

    setIsLoading(false);
  }

  function replaceURL(text: string, iconWidth = 24) {
    const rexp = /((https?):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
    const url = text.match(rexp);
    const replacedText = text.replace(rexp, "");

    const content = (
      <Link href={String(url)} target="_blank" className="group relative">
        <span className="absolute left-0 -translate-y-full rounded-sm bg-slate-200 py-1 px-3 text-xs text-slate-600  opacity-0 transition-opacity group-hover:opacity-100 dark:bg-slate-600 dark:text-slate-200">
          {url}
        </span>
        <LinkIcon width={iconWidth} className="mb-1 mr-1 inline" />
        {replacedText}
      </Link>
    );

    return url ? content : text;
  }

  // @ts-ignore
  return (
    <article aria-labelledby={"answer-title-" + post.id}>
      <div>
        <div className="flex justify-between space-x-5">
          <UserCard profile={item.profile} variant="feed" />
          <div>
            {post.status === PostStatus.Draft && (
              <span className="inline-flex items-center rounded-md bg-red-200 px-2.5 py-0.5 text-sm font-semibold text-red-600">
                <EyeSlashIcon className="mr-2 h-5 w-5" />
                {post.status}
              </span>
            )}

            {post.topicSlug && (
              <Link href={`/t/${post.topicSlug}`}>
                <span className="inline-flex items-center rounded-md bg-cyan-200 px-2.5 py-1.5 text-sm font-semibold text-cyan-600">
                  <HashtagIcon className="h-5 w-5" />
                  {post.topicName}
                </span>
              </Link>
            )}
            <p className="text-xs text-gray-400">
              <Moment date={post.date} format="YYYY/MM/DD HH:mm" />
            </p>
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-gray-50">
          {replaceURL(post.header)}
        </h2>
      </div>
      {post.detail && (
        <div className="mt-2 space-y-4">
          <div className="overflow-x-clip text-ellipsis text-base  text-gray-500 dark:text-gray-300 ">
            {replaceURL(post.detail.answer, 22)}
          </div>
          {post.detail.multimediaUrls && (
            <div className="flex justify-center">
              {post.detail.multimediaUrls?.map(url => (
                // eslint-disable-next-line react/jsx-key
                <iframe
                  src={url}
                  width="450"
                  height="400"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-8">
        <div className="flex text-sm">
          <span className="inline-flex items-center space-x-4 text-sm">
            {isOwnerUser && (
              <>
                {!post.detail && (
                  <button
                    type="button"
                    className="inline-flex space-x-1  text-purple-700 dark:text-purple-400 "
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
                  onClick={() => onDelete(post.id)}
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-bold ">Delete</span>
                </button>
              </>
            )}

            {/* <button
              type="button"
              className="inline-flex space-x-1 text-gray-400"
            >
              <ShareIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-bold text-gray-600">Share</span>
            </button> */}
          </span>
        </div>
      </div>
      {showReply && (
        <MultimediaTextarea
          placeholder="Send your reply"
          value={reply || ""}
          maxLength={1000}
          setValue={val => setReply(val)}
          setValueUrls={urls => setReplyMediaUrls(urls)}
          onSend={() => sendReply(item.id, reply!)}
          isLoading={isLoading}
        />
      )}
    </article>
  );
}

export default Post;
