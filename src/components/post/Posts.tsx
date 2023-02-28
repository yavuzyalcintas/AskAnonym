"use client";

import { Database } from "@/supabase/database";
import { Question, QuestionStatus } from "@/supabase/models";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import Post from "./Post";

interface PostsProps {
  questions: Question[];
}

function Posts({ questions }: PostsProps) {
  //Listen realtime changes
  const supabase = useSupabaseClient<Database>();
  const user = useSession();
  const [posts, setPosts] = useState(questions);

  useEffect(() => {
    setPosts(questions);
  }, [questions]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "questions" },
        (payload) => {
          setPosts((posts) => [payload.new as Question, ...posts]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "questions" },
        (payload) => {
          setPosts((posts) => posts.filter((w) => w.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [questions, supabase]);

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
          .map((question) => (
            <li
              key={question.id}
              className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
            >
              <Post post={question} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default Posts;
