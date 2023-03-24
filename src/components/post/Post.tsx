"use client";

import { Menu } from "@headlessui/react";
import {
  ChatBubbleBottomCenterIcon,
  EyeSlashIcon,
  HashtagIcon,
  LinkIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import React, { useState } from "react";
import Moment from "react-moment";

import ConfirmDialog from "@/src/components/common/dialog/ConfirmDialog";
import { Database } from "@/supabase/database";
import { Answer, Question, QuestionStatus } from "@/supabase/models";
import { answerQuery } from "@/supabase/queries";

import Textarea from "../common/textarea/Textarea";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const user = useUser();

  const isOwnerUser = user && user.id === post.profile.id;

  async function sendReply(questionId: string, reply: string) {
    if (!reply) return;
    setIsLoading(true);

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

  async function blockPostUser(questionId: string) {
    const { data: question } = await supabase
      .from("questions")
      .select("*")
      .eq("id", questionId)
      .single();

    if (question && question.asker_id) {
      await supabase
        .from("blocked_users")
        .insert({
          user_id: question.user_id,
          blocked_user_id: question.asker_id!
        })
        .then(res => {
          if (res.error) {
            Notify.failure("Failed to block user");
          } else {
            window.location.reload();
          }
        });
    }
  }

  return (
    <article aria-labelledby={"answer-title-" + post.id}>
      <div>
        <div className="flex justify-between space-x-5">
          <UserCard profile={item.profile} variant="feed" />
          <ConfirmDialog
            onConfirmation={() => blockPostUser(post.id)}
            setIsOpen={setOpenConfirmDialog}
            title={"Are you sure?"}
            isOpen={openConfirmDialog}
            description={
              "If you block the user you will not be able to see their posts anymore and you will not be able to roll back this action."
            }
          />
          <div className="flex items-center space-x-2">
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
            {isOwnerUser && post.profile.is_private && (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setOpenConfirmDialog(true)}
                          className={`${active ? "bg-gray-100" : ""}
                                        group flex w-full items-center rounded-md p-2 text-sm text-gray-700`}
                        >
                          <NoSymbolIcon className="mr-2 h-5 w-5" />
                          Block User
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            )}
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-gray-50">
          {replaceURL(post.header)}
        </h2>
      </div>

      {post.detail && (
        <div className="mt-2 space-y-4 overflow-x-clip text-ellipsis text-base  text-gray-500 dark:text-gray-300 ">
          {replaceURL(post.detail, 22)}
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
        <Textarea
          placeholder="Send your reply"
          value={reply || ""}
          maxLength={1000}
          setValue={val => setReply(val)}
          onSend={() => sendReply(item.id, reply!)}
          isLoading={isLoading}
        />
      )}
    </article>
  );
}

export default Post;
