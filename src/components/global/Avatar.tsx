import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AvatarProps {
  username: string;
  url: string | null;
  size: 32 | 64 | 128;
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
        }}
      />
    </Link>
  );
}

export default Avatar;
