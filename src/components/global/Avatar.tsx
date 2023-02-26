import React from "react";
import Image from "next/image";

interface AvatarProps {
  url: string | null;
  size: 32 | 64 | 128;
}

function Avatar({ url, size }: AvatarProps) {
  return (
    <Image
      src={url || "/images/default-avatar.png"}
      alt="avatar"
      className="bg-white rounded-full"
      width={size}
      height={size}
    />
  );
}

export default Avatar;
