"use client";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React from "react";

import { Database } from "@/supabase/database";

import CallToAction from "../global/CallToAction";
import Post from "./Post";
import { PostItem, PostStatus } from "./types";

interface PostsProps {
  posts: PostItem[];
  variant: "home" | "profile";
  userId?: string;
  sessionUserId?: string;
}

function Posts({ posts, userId, sessionUserId }: PostsProps) {
  return (
    <>
      <h1 className="sr-only">Recent questions</h1>

      <ul role="list" className="space-y-4">
        {posts
          .filter(w =>
            sessionUserId === userId ? true : w.status === PostStatus.Published
          )
          .map((post, id) => (
            <React.Fragment key={id}>
              {id === 3 && !sessionUserId && <CallToAction />}
              <li className=" bg-white px-4  py-6 shadow dark:bg-slate-700 sm:rounded-lg sm:p-6">
                <Post item={post} />
              </li>
            </React.Fragment>
          ))}
      </ul>
    </>
  );
}

export default Posts;
