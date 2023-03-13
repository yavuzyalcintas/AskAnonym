"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useCallback, useRef } from "react";

export const AvatarUpload = ({ username }: { username: string }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const isOwnerUser = user && user.user_metadata.username === username;

  const imageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(username.toHashString(), file, {
          cacheControl: "600",
          upsert: true
        });
      if (error) {
        return;
      }
      await supabase
        .from("profiles")
        .update({
          avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data?.path}`
        })
        .match({ id: user?.id });
    },
    [supabase, user?.id, username]
  );

  if (!isOwnerUser) return null;
  return (
    <div className="absolute top-0 right-0 z-20 rounded bg-slate-800 p-1">
      <ArrowUpTrayIcon
        onClick={() => inputRef.current?.click()}
        color="white"
        className="h-5 w-5"
      />
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={imageSelect}
      />
    </div>
  );
};
