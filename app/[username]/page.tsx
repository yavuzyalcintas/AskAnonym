import Topics from "@/src/components/Topics";
import AskQuestion from "@/src/components/AskQuestion";
import CreateTopic from "@/src/components/CreateTopic";
import { notFound } from "next/navigation";
import Avatar from "@/src/components/global/Avatar";
import Posts from "@/src/components/post/Posts";
import { Answer, Question, QuestionStatus, Topic } from "@/supabase/models";
import { createClient } from "@/utils/supabase/supabase-server";
import { answerQuery, questionQuery } from "@/supabase/queries";
import { AvatarUpload } from "../../src/components/user/AvatarUpload";
import { answerToPost, questionToPost } from "../../src/components/post/mapper";
import { PostItem } from "@/src/components/post/types";

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
    .from("answers")
    .select(answerQuery)
    .eq("user_id", ownerUser?.id);

  if (topic) {
    questQuery = questQuery.eq("question.topic_id", topic?.id);
  }

  questQuery.order("created_at", { ascending: false });

  const { data: answers } = await questQuery;

  const { data: draftQuestions } = await supabase
    .from("questions")
    .select(questionQuery)
    .eq("status", QuestionStatus.Draft)
    .eq("user_id", ownerUser?.id)
    .order("created_at", { ascending: true });

  var posts: PostItem[] = [];

  if (draftQuestions) {
    posts = posts.concat(questionToPost(draftQuestions as Question[]));
  }

  if (answers) {
    posts = posts.concat(answerToPost(answers as Answer[]));
  }

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
                  <AvatarUpload username={username} />
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
                    posts={posts}
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
