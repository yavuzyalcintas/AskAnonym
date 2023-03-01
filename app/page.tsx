import MainFeed from "@/src/components/feed/MainFeed";

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <MainFeed />
    </>
  );
}
