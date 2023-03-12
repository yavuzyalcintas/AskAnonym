import Link from "next/link";
import React from "react";

import { createClient } from "@/utils/supabase/supabase-server";

import Avatar from "../global/Avatar";

async function RightFeed() {
  const supabase = createClient();

  const { data: newJoiners } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(3);

  const { data: topUsers } = await supabase
    .from("top_users")
    .select("*")
    .limit(5);

  return (
    <aside className="hidden xl:col-span-4 xl:block">
      <div className="sticky top-4 space-y-4">
        <section className="grid gap-5" aria-labelledby="who-to-follow-heading">
          <div className="rounded-lg bg-white shadow dark:bg-slate-700">
            <div className="p-6">
              <h2
                id="who-to-follow-heading"
                className="text-lg font-bold text-gray-900"
              >
                😻 Active Cats
              </h2>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {topUsers?.map(user => (
                    <li
                      key={user.username}
                      className="flex items-center space-x-3 py-4"
                    >
                      <div className="shrink-0">
                        <Avatar
                          url={user.avatar_url}
                          username={user.username!}
                          size={32}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-purple-700">
                          <Link href={user.username!}>{user.username}</Link>
                          <span className="font-normal text-gray-700">
                            {" "}
                            {user.count}
                          </span>
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Link
                          href={user.username!}
                          className="inline-flex items-center rounded-full bg-purple-50 px-3 py-0.5 text-sm font-bold text-purple-700 hover:bg-purple-100"
                        >
                          Ask Question!
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white  shadow dark:bg-slate-700">
            <div className="p-6">
              <h2
                id="who-to-follow-heading"
                className="text-lg font-bold text-gray-900"
              >
                😼 Kittens
              </h2>
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-4 divide-y divide-gray-200">
                  {newJoiners?.map(user => (
                    <li
                      key={user.id}
                      className="flex items-center space-x-3 py-4"
                    >
                      <div className="shrink-0">
                        <Avatar
                          url={user.avatar_url}
                          username={user.username!}
                          size={32}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-purple-700">
                          <Link href={user.username!}>{user.username}</Link>
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Link
                          href={user.username!}
                          className="inline-flex items-center rounded-full bg-purple-50 px-3 py-0.5 text-sm font-bold text-purple-700 hover:bg-purple-100"
                        >
                          Ask Question!
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

export default RightFeed;
