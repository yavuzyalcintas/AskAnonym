import Post from "@/src/components/Post";
import Topics from "@/src/components/Topics";
import AskQuestion from "@/src/components/AskQuestion";
import CreateTopic from "@/src/components/CreateTopic";
import supabase from "@/utils/supabase/supabase";
import { notFound } from "next/navigation";
import Avatar from "@/src/components/global/Avatar";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
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
    .select("*")
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
                  <Avatar url={ownerUser.avatar_url} />
                </div>
              </div>
              <div>
                <h1 className="text-[72px] font-bold text-purple-700">
                  {username}
                </h1>
                <p className="text-sm font-medium text-gray-500">Info</p>
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
                  <div className="divide-y divide-gray-200">
                    <ul role="list" className="space-y-8">
                      {questions?.map((question) => (
                        <li key={question.id}>
                          <Post
                            date={question.created_at}
                            question={question.question}
                            username={username}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
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
