import Topics from "@/src/components/Topics";
import AskQuestion from "@/src/components/AskQuestion";
import CreateTopic from "@/src/components/CreateTopic";
import { notFound } from "next/navigation";
import Avatar from "@/src/components/global/Avatar";
import Posts from "@/src/components/post/Posts";
import { Question } from "@/supabase/models";
import { createClient } from "@/utils/supabase/supabase-server";
import { questionQuery } from "@/supabase/queries";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();
  const username = params.username;
  const { data: ownerUser, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!ownerUser || error) {
    notFound();
  }

  const { data: questions } = await supabase
    .from("questions")
    .select(questionQuery)
    .eq("user_id", ownerUser?.id)
    .order("created_at", { ascending: false });

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
                <h1 className="text-[72px] font-bold text-purple-700">
                  {username}
                </h1>
                <p className="text-sm font-medium text-gray-500">User info</p>
              </div>
            </div>
            <CreateTopic username={username} />
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              <AskQuestion username={username} />

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

            <Topics />
          </div>
        </main>
      </div>
    </>
  );
}
