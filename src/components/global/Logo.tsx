import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <>
      <Link href="/" className="flex justify-start">
        {/* <div className="text-3xl font-extrabold  text-purple-700 dark:text-purple-400 ">
          <span className="text-4xl">ask</span>
          <span className="text-2xl text-yellow-400"> anonym</span>
          <span>¿</span>
        </div> */}
        <Image src="/images/logo.png" alt="cta" width={100} height={50} />
      </Link>
    </>
  );
}

export default Logo;
