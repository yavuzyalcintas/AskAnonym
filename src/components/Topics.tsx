import {
  Bars3BottomLeftIcon,
  FireIcon,
  HashtagIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

import { User } from "@/supabase/models";
import { createClient } from "@/utils/supabase/supabase-server";

import { classNames } from "../helpers/tailwindHelper";

interface TopicsProps {
  user?: User;
  selectedTopicId?: string;
}

export default async function Topics({ user, selectedTopicId }: TopicsProps) {
  const supabase = createClient();

  //TODO: fix any
  var topicsQuery: any;

  if (user) {
    topicsQuery = supabase
      .from("topics")
      .select(
        `
      *,
      user_topics!inner(*)
    `
      )
      .eq("user_topics.user_id", user?.id)
      .order("created_at", { ascending: false });
  } else {
    topicsQuery = supabase.from("top_topics").select("*");
  }

  const { data: topics } = await topicsQuery;

  return (
    <>
      {topics && (
        <div className="divide-y divide-gray-300">
          <p
            className="inline-flex px-3 pb-3 text-xl font-bold text-orange-600"
            id="communities-headline"
          >
            <FireIcon className="h-7 w-7" />
            Hot Topics
          </p>
          <div
            className="space-y-2 pt-3"
            aria-labelledby="communities-headline"
          >
            {topics?.map((topic: any) => (
              <Link
                key={topic.id}
                href={
                  user
                    ? `/${user.username}?t=${topic.slug}`
                    : `/t/${topic.slug}`
                }
                className={classNames(
                  topic.id === selectedTopicId
                    ? "bg-gray-200    text-gray-900 dark:text-gray-50  "
                    : "  text-gray-700 dark:text-gray-100   hover: bg-gray-50 dark:bg-gray-500 ",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-semibold   text-gray-700 dark:text-gray-100  hover: bg-gray-50 dark:bg-gray-500  hover:   text-gray-900 dark:text-gray-50 "
                )}
              >
                <span className="inline-flex">
                  <HashtagIcon className="mt-1 h-4 w-4 text-gray-400" />
                  {topic.name}
                </span>
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href={`/${user?.username}`}
                  className={
                    "hover: group flex items-center justify-center rounded-md px-3 py-2 text-base   font-semibold text-gray-700  text-gray-900   hover: bg-gray-50 dark:bg-gray-500  dark:text-gray-50  dark:text-gray-100"
                  }
                >
                  <span className="inline-flex truncate  text-purple-700 dark:text-purple-400 ">
                    <Bars3BottomLeftIcon className="mt-1 mr-2 h-4 w-4" />
                    View All
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
