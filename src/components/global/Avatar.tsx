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
      <div
        style={{
          backgroundImage: `url(${image})`,
          width: size,
          height: size,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%",
          outline: "3px solid #8B5CF6" // Outline purple-400
        }}
      />
    </Link>
  );
}

export default Avatar;
