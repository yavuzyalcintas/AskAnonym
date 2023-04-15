import Posts from "@/src/components/post/Posts";
import Topics from "@/src/components/Topics";
import { Answer } from "@/supabase/models";
import { answerQuery } from "@/supabase/queries";
import { createClient } from "@/utils/supabase/supabase-server";

import { answerToPost } from "../../components/post/mapper";
import AppStatus from "../AppStatus";
import LeftMenuNav from "./LeftMenuNav";
import RightFeed from "./RightFeed";

interface MainFeedProps {
  topicId?: string;
}

export default async function MainFeed({ topicId }: MainFeedProps) {
  const supabase = createClient();

  var questQuery = supabase.from("answers").select(answerQuery);
  const { data: sessionUser } = await supabase.auth.getSession();

  if (topicId) questQuery = questQuery.eq("topic_id", topicId);

  //TODO add pagination into Posts components
  questQuery = questQuery.order("created_at", { ascending: false }).limit(300);

  const { data: answers } = await questQuery;

  return (
    <>
      <div className="min-h-full ">
        <div className="py-10">
          <div className="container mx-auto sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="space-y-1 pb-8">
                  <LeftMenuNav />

                  {/* <Topics /> */}
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-6">
              <div className="">
                <section aria-labelledby="notes-title">
                  <AppStatus />
                  <div className="mt-5">
                    <Posts
                      variant="home"
                      posts={answerToPost(answers as Answer[])}
                      sessionUserId={sessionUser.session?.user.id}
                    />
                  </div>
                </section>
              </div>
            </main>
            {/* @ts-expect-error Server Component */}
            <RightFeed />
          </div>
        </div>
      </div>
    </>
  );
}
