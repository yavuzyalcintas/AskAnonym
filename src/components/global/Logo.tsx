import Link from "next/link";
import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <>
      <Link href="/" className="flex justify-start">
        <Image
          src="/images/sharedev-logo.png"
          alt="Logo"
          width={183}
          height={41}
          className="h-8 -translate-x-4 md:h-auto md:translate-x-0"
        />
      </Link>
    </>
  );
}

export default Logo;
