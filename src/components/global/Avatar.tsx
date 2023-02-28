import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AvatarProps {
  username: string;
  url: string | null;
  size: 32 | 64 | 128;
}

function Avatar({ url, size, username }: AvatarProps) {
  return (
    <Link href={"/" + username}>
      <Image
        src={url || "/images/default-avatar.png"}
        alt="avatar"
        className="bg-white rounded-full"
        width={size}
        height={size}
      />
    </Link>
  );
}

export default Avatar;
