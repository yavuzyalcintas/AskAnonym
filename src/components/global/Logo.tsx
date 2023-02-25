import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <>
      <Link href="/" className="flex justify-start">
        <div className="text-3xl font-extrabold text-purple-700">
          <span className="text-4xl">ask</span>
          <span className="text-2xl text-yellow-400"> anonym</span>
          <span>¿</span>
        </div>
      </Link>
    </>
  );
}

export default Logo;
