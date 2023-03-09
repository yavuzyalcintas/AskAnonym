import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
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
    <div className="flex items-center space-x-2">
      <div className="shrink-0">
        <div className="relative">
          <Avatar
            username={profile.username}
            url={profile.avatar_url}
            size={variant == "profile" ? 128 : 40}
          />

          {variant === "profile" && (
            <AvatarUpload username={profile.username} />
          )}
        </div>
      </div>
      <div className="">
        <h1
          className={
            (profile.is_verified?.text_color
              ? profile.is_verified?.text_color
              : " text-purple-700 ") +
            (variant === "profile"
              ? " text-4xl sm:text-[50px] md:text-[72px]"
              : " text-lg") +
            " inline-flex justify-center items-center font-bold  "
          }
        >
          <Link href={profile.username}>{profile.username}</Link>

          {profile.is_verified && (
            <CheckBadgeIcon
              className={
                (variant === "profile"
                  ? "ml-2 h-5 w-5 sm:h-10 sm:w-12 md:h-12 md:w-12 "
                  : "h-5 w-5 ") + profile.is_verified.badge_color
              }
            />
          )}
        </h1>
      </div>
    </div>
  );
}

export default UserCard;
