import { User } from "@/supabase/models";
import { createClient } from "@/utils/supabase/supabase-server";
import {
  ArrowPathIcon,
  Bars3BottomLeftIcon,
  HashtagIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { classNames } from "../helpers/tailwindHelper";

interface TopicsProps {
  user?: User;
  selectedTopicId?: string;
}

export default async function Topics({ user, selectedTopicId }: TopicsProps) {
  const supabase = createClient();

  var topicsQuery = supabase.from("topics").select(
    `
      *,
      user_topics!inner(*)
    `
  );

  if (user) topicsQuery = topicsQuery.eq("user_topics.user_id", user?.id);

  //TODO get top 10 topics with by questions
  topicsQuery.order("created_at", { ascending: false }).limit(10);
  const { data: topics } = await topicsQuery;

  return (
    <>
      <div className="divide-y divide-gray-300">
        <p
          className="inline-flex px-3 pb-3 text-xl font-bold text-orange-600"
          id="communities-headline"
        >
          <FireIcon className="h-7 w-7" />
          Hot Topics
        </p>
        <div className="pt-3 space-y-2" aria-labelledby="communities-headline">
          {topics?.map((topic) => (
            <Link
              key={topic.id}
              href={
                user ? `/${user.username}?t=${topic.slug}` : `/t/${topic.slug}`
              }
              className={classNames(
                topic.id === selectedTopicId
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50",
                "group flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="inline-flex">
                <HashtagIcon className="w-4 h-4 mt-1 text-gray-400" />
                {topic.name}
              </span>
            </Link>
          ))}

          {user && (
            <>
              <Link
                href={`/${user?.username}`}
                className={
                  "flex justify-center group items-center rounded-md px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
              >
                <span className="truncate inline-flex text-purple-700">
                  <Bars3BottomLeftIcon className="w-4 h-4 mt-1 mr-2" />
                  View All
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
