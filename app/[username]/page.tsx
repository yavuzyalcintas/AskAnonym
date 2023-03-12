import { notFound } from "next/navigation";

import AskQuestion from "@/src/components/AskQuestion";
import CreateTopic from "@/src/components/CreateTopic";
import UserCard from "@/src/components/global/UserCard";
import Posts from "@/src/components/post/Posts";
import { PostItem } from "@/src/components/post/types";
import Topics from "@/src/components/Topics";
import EditProfile from "@/src/components/user/EditProfile";
import ProfileDetails from "@/src/components/user/ProfileDetails";
import {
  Answer,
  Question,
  QuestionStatus,
  Topic,
  User
} from "@/supabase/models";
import { answerQuery, questionQuery } from "@/supabase/queries";
import { createClient } from "@/utils/supabase/supabase-server";

import { answerToPost, questionToPost } from "../../src/components/post/mapper";

export default async function UserProfile({
  params,
  searchParams
}: {
  params: { username: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const supabase = createClient();
  const username = params.username;
  const topicSlug = searchParams && searchParams["t"];
  const sessionUser = await supabase.auth.getUser();

  const { data: ownerUser, error } = await supabase
    .from("profiles")
    .select(
      `*,
      is_verified:verified_users(*)`
    )
    .ilike("username", username)
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

  if (topicSlug) {
    posts = posts.filter(w => w.topicSlug === topicSlug);
  }

  return (
    <>
      <div className="min-h-full ">
        <main className="py-10">
          {/* Page header */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <UserCard profile={ownerUser as User} variant="profile" />

            <div className="inline-flex space-x-4">
              <CreateTopic username={username} />
              <EditProfile profile={ownerUser as User} />
            </div>
          </div>

          <ProfileDetails profile={ownerUser as User} />

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
                    sessionUserId={sessionUser.data.user?.id}
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
