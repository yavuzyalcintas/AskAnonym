import React from "react";
import Image from "next/image";

interface AvatarProps {
  url: string | null;
}

function Avatar({ url }: AvatarProps) {
  return (
    <>
      <Image
        src={url || "/images/default-avatar.png"}
        alt="avatar"
        className="bg-white rounded-full"
        width={128}
        height={128}
      />
      <span
        className="absolute inset-0 rounded-full shadow-inner"
        aria-hidden="true"
      />
    </>
  );
}

export default Avatar;
