import Link from "next/link";

import Avatar from "@/src/components/global/Avatar";
import Logo from "@/src/components/global/Logo";
import { createClient } from "@/utils/supabase/supabase-server";

export default async function Home() {
  const supabase = createClient();

  const { data: topUsers } = await supabase
    .from("top_users")
    .select("*")
    .limit(10);

  return (
    <div>
      <div className="flex items-center justify-center">
        <Logo height={300} width={500} />
      </div>
      <div className="mt-6 flow-root px-48">
        <h1 className="mb-10 text-center text-3xl font-bold text-white">
          Patron çıldırdı, dükkanı kapattı :)
        </h1>
        <h1 className="mb-10 text-center text-xl text-white">
          Aşağıdaki 10 kişiye çok teşekkür ederim. Yeni projlerde görüşmek
          üzere.. -myy
        </h1>
        <ul role="list" className=" ">
          {topUsers?.map(user => (
            <li
              key={user.username}
              className="flex items-center space-x-3 py-4"
            >
              <div className="shrink-0">
                <Avatar
                  url={user.avatar_url}
                  username={user.username!}
                  size={128}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="inline-flex text-lg font-bold  text-purple-700 dark:text-purple-400 ">
                  <div className="pr-3">{user.username}</div>
                  <span className="font-normal text-gray-300 ">
                    {" "}
                    {user.count}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
