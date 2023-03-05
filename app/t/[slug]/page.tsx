import { notFound } from "next/navigation";
import React from "react";

import MainFeed from "@/src/components/feed/MainFeed";
import { createClient } from "@/utils/supabase/supabase-server";

async function SlugPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: topic, error } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!topic || error) {
    notFound();
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <MainFeed topicId={topic.id} />
    </>
  );
}

export default SlugPage;
