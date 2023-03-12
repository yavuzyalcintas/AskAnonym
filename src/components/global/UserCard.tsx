import { CheckBadgeIcon, SparklesIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
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
  const badgeClasses =
    (variant === "profile"
      ? "ml-2 h-5 w-5 sm:h-10 sm:w-12 md:h-12 md:w-12 "
      : "h-5 w-5 ") + profile.is_verified?.badge_color;

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
              ? profile.is_verified?.text_color +
                " dark:text-purple-400 ml-2sm:ml-4 sm:ml-2"
              : "  text-purple-700 dark:text-purple-400  ") +
            (variant === "profile"
              ? " text-4xl sm:ml-4 sm:text-[28px] md:text-[42px]"
              : " text-lg") +
            " inline-flex justify-center items-center font-bold  "
          }
        >
          <Link href={profile.username}>{profile.username}</Link>

          {profile.is_verified &&
            (profile.is_verified.type === "leader" ? (
              <Image
                src="/images/leader.png"
                alt="leader"
                width={variant == "profile" ? 80 : 25}
                height={variant == "profile" ? 80 : 25}
              />
            ) : (
              <CheckBadgeIcon className={`${badgeClasses} ml-1`} />
            ))}
        </h1>
      </div>
    </div>
  );
}

export default UserCard;
