import { HashtagIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function Topics() {
  const communities = [
    { name: "Movies", href: "#" },
    { name: "Food", href: "#" },
    { name: "Sports", href: "#" },
    { name: "Animals", href: "#" },
    { name: "Science", href: "#" },
    { name: "Dinosaurs", href: "#" },
    { name: "Talents", href: "#" },
    { name: "Gaming", href: "#" },
  ];

  return (
    <div className="divide-y divide-gray-300">
      <p
        className="inline-flex px-3 pb-3 text-xl font-bold text-orange-600"
        id="communities-headline"
      >
        <FireIcon className="h-7 w-7" />
        Hot Topics
      </p>
      <div className="pt-3 space-y-2" aria-labelledby="communities-headline">
        {communities.map((community) => (
          <Link
            key={community.name}
            href={community.href}
            className="group flex items-center rounded-md px-3 py-2 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="truncate inline-flex">
              <HashtagIcon className="w-4 h-4 mt-1 text-gray-400" />
              {community.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topics;
