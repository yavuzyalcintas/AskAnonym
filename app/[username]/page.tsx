import Topics from "@/src/components/Topics";
import AskQuestion from "@/src/components/AskQuestion";
import CreateTopic from "@/src/components/CreateTopic";
import { notFound } from "next/navigation";
import Avatar from "@/src/components/global/Avatar";
import Posts from "@/src/components/post/Posts";
import { Question, Topic } from "@/supabase/models";
import { createClient } from "@/utils/supabase/supabase-server";
import { questionQuery } from "@/supabase/queries";

export default async function UserProfile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const supabase = createClient();
  const username = params.username;
  const topicSlug = searchParams && searchParams["t"];

  const { data: ownerUser, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!ownerUser || error) {
    notFound();
  }

  const { data: topic } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", topicSlug)
    .maybeSingle();

  var questQuery = supabase
    .from("questions")
    .select(questionQuery)
    .eq("user_id", ownerUser?.id)
    .order("created_at", { ascending: false });

  if (topic) {
    questQuery = questQuery.eq("topic_id", topic?.id);
  }

  questQuery.order("created_at", { ascending: false });

  const { data: questions } = await questQuery;

  return (
    <>
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Avatar
                    username={username}
                    url={ownerUser.avatar_url}
                    size={128}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-4xl sm:text-[50px] md:text-[72px] font-bold pb-2 text-purple-700">
                  {username}
                </h1>
              </div>
            </div>
            <CreateTopic username={username} />
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              <AskQuestion username={username} topic={topic as Topic} />

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="">
                  <Posts
                    variant="profile"
                    questions={questions as Question[]}
                    userId={ownerUser.id}
                  />
                </div>
              </section>
            </div>

            {/* @ts-expect-error Server Component */}
            <Topics user={ownerUser} selectedTopicId={topic?.id} />
          </div>
        </main>
      </div>
    </>
  );
}
