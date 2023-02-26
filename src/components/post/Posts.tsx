"use client";

import { Question } from "@/supabase/models";
import {
  ChatBubbleLeftEllipsisIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Post from "./Post";

interface PostsProps {
  questions: Question[];
}

function Posts({ questions }: PostsProps) {
  //Listen realtime changes

  return (
    <>
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        {questions.map((question) => (
          <li
            key={question.id}
            className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
          >
            <Post question={question} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Posts;
