"use client";

import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";

function LeftMenuNav() {
  const user = useUser();

  return (
    <div className="mb-12">
      <Link
        href="/"
        className={
          "group flex items-center rounded-md px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }
      >
        <span className="inline-flex truncate text-gray-700">
          <HomeIcon className="mt-1 mr-2 h-4 w-4" />
          Home
        </span>
      </Link>

      {user && (
        <Link
          href={`/${user?.user_metadata.username}`}
          className={
            "group flex items-center rounded-md px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }
        >
          <span className="inline-flex truncate text-gray-700">
            <UserIcon className="mt-1 mr-2 h-4 w-4" />
            Profile
          </span>
        </Link>
      )}
    </div>
  );
}

export default LeftMenuNav;
