import Link from "next/link";
import React from "react";

interface AvatarProps {
  username: string;
  url: string | null;
  size: 32 | 40 | 64 | 72 | 128;
  classname?: any;
}

function Avatar({ url, size, username, classname }: AvatarProps) {
  const image = url || "/images/default-avatar.png";
  return (
    <Link href={"/" + username}>
      <div
        className={classname}
        style={{
          position: "relative",
          zIndex: 10,
          backgroundImage: `url(${image})`,
          // width: size,
          // height: size,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%"
        }}
      />
    </Link>
  );
}

export default Avatar;
