import Link from "next/link";

import Posts from "@/src/components/post/Posts";
import Topics from "@/src/components/Topics";
import { Answer } from "@/supabase/models";
import { answerQuery } from "@/supabase/queries";
import { createClient } from "@/utils/supabase/supabase-server";

import { answerToPost } from "../../components/post/mapper";
import Avatar from "../global/Avatar";
import LeftMenuNav from "./LeftMenuNav";

interface MainFeedProps {
  topicId?: string;
}

export default async function MainFeed({ topicId }: MainFeedProps) {
  const supabase = createClient();

  var questQuery = supabase.from("answers").select(answerQuery);

  if (topicId) questQuery = questQuery.eq("topic_id", topicId);

  //TODO add pagination into Posts components
  questQuery = questQuery.order("created_at", { ascending: false }).limit(100);

  const { data: answers } = await questQuery;

  const { data: newJoiners } = await supabase
    .from("profiles")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(10);

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="container mx-auto sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="space-y-1 pb-8">
                  <LeftMenuNav />

                  {/* @ts-expect-error Server Component */}
                  <Topics />
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-6">
              <div className="mt-4">
                <section aria-labelledby="notes-title">
                  <div className="">
                    <Posts
                      variant="home"
                      posts={answerToPost(answers as Answer[])}
                    />
                  </div>
                </section>
              </div>
            </main>
            <aside className="hidden xl:col-span-4 xl:block">
              <div className="sticky top-4 space-y-4">
                <section aria-labelledby="who-to-follow-heading">
                  <div className="rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h2
                        id="who-to-follow-heading"
                        className="text-lg font-bold text-gray-900"
                      >
                        New Joiners
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
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
                                <p className="text-sm font-medium text-gray-900">
                                  <Link href={user.username!}>
                                    {user.username}
                                  </Link>
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
                      {/* <div className="mt-6">
                        <a
                          href="#"
                          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div> */}
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
