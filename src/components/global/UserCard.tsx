import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import React from "react";

import { User } from "@/supabase/models";

import { AvatarUpload } from "../user/AvatarUpload";
import Avatar from "./Avatar";

interface UserCardProps {
  profile: User;
  variant: "profile" | "feed";
}

function UserCard({ profile, variant }: UserCardProps) {
  return (
    <div className="flex items-center space-x-5">
      <div className="shrink-0">
        <div className="relative">
          <Avatar
            username={profile.username}
            url={profile.avatar_url}
            size={128}
          />

          {variant === "profile" && (
            <AvatarUpload username={profile.username} />
          )}
        </div>
      </div>
      <div>
        <h1 className="inline-flex pb-2 text-4xl font-bold text-purple-700 sm:text-[50px] md:text-[72px]">
          {profile.username}
          {profile.is_verified && (
            <CheckBadgeIcon className="ml-2 h-5 w-5 text-cyan-500 sm:h-10 sm:w-12 md:h-12 md:w-12 " />
          )}
        </h1>
      </div>
    </div>
  );
}

export default UserCard;
