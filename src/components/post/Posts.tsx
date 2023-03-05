"use client";

import { Database } from "@/supabase/database";
import { Answer, Question, QuestionStatus } from "@/supabase/models";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import CallToAction from "../global/CallToAction";
import Post from "./Post";
import { PostItem } from "./types";

interface PostsProps {
  posts: PostItem[];
  variant: "home" | "profile";
  userId?: string;
}

function Posts({ posts, variant, userId }: PostsProps) {
  const user = useUser();

  return (
    <>
      <h1 className="sr-only">Recent questions</h1>

      <ul role="list" className="space-y-4">
        {posts.map((post, id) => (
          <React.Fragment key={id}>
            {id === 3 && !user && <CallToAction />}
            <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
              <Post item={post} />
            </li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

export default Posts;
