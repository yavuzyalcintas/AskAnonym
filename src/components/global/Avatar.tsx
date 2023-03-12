import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AvatarProps {
  username: string;
  url: string | null;
  size: 32 | 40 | 64 | 128;
}

function Avatar({ url, size, username }: AvatarProps) {
  const image = url || "/images/default-avatar.png";
  return (
    <Link href={"/" + username}>
      <Image
        src={image}
        width={size}
        height={size}
        alt="profile"
        className="rounded-full"
        quality={30}
      />
    </Link>
  );
}

export default Avatar;
