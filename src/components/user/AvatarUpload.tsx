"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useCallback, useRef } from "react";
import { toast } from "react-hot-toast";

// this is the list of file types that can be uploaded
const uploadType = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/jpg",
  "image/svg"
];

export const AvatarUpload = ({ username }: { username: string }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const isOwnerUser = user && user.user_metadata.username === username;

  // updating profile pic url
  const updateImage = async (data: any) => {
    await supabase
      .from("profiles")
      .update({
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data?.path}`
      })
      .match({ id: user?.id });
  };
  //upload image to supabase storage and update the profile pic
  const uploadImage = async (file: File) => {
    // this func is checking if the file is an image
    if (!uploadType.includes(file.type)) {
      toast.error("File type not supported");
      return Promise.reject();
    }

    await supabase.storage
      .from("avatars")
      .upload(username.toHashString(), file, {
        cacheControl: "600",
        upsert: true
      })
      .then(({ data, error }) => {
        if (error) Promise.reject();
        updateImage(data);
      });
  };

  const imageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      toast.promise(uploadImage(file), {
        loading: "Uploading...",
        success: "Uploaded",
        error: "Not uploaded"
      });
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
