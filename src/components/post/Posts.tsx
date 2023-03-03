"use client";

import { Database } from "@/supabase/database";
import { Question, QuestionStatus } from "@/supabase/models";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import CallToAction from "../global/CallToAction";
import Post from "./Post";

interface PostsProps {
  questions: Question[];
  variant: "home" | "profile";
  userId?: string;
}

function Posts({ questions, variant, userId }: PostsProps) {
  //Listen realtime changes
  const supabase = useSupabaseClient<Database>();
  const user = useSession();
  const [posts, setPosts] = useState(questions);

  useEffect(() => {
    setPosts(questions);
  }, [questions]);

  useEffect(() => {
    var filter: string | undefined = undefined;
    switch (variant) {
      case "home":
        filter = "status=eq." + QuestionStatus.Published;
        break;
      case "profile":
        filter = "user_id=eq." + userId;
        break;
      default:
        break;
    }

    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "questions",
          filter: filter,
        },
        (payload) => {
          setPosts((posts) => [payload.new as Question, ...posts]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "questions",
          filter: filter,
        },
        (payload) => {
          setPosts((posts) => posts.filter((w) => w.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [questions, variant, supabase]);

  return (
    <>
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        {posts
          .filter((w) =>
            w.user_id === user?.user.id
              ? true
              : w.status === QuestionStatus.Published
          )
          .map((question, id) => (
            <>
              {id === 3 && !user && <CallToAction />}
              <li
                key={question.id}
                className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
              >
                <Post post={question} />
              </li>
            </>
          ))}
      </ul>
    </>
  );
}

export default Posts;
