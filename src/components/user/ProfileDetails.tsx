import {
  HeartIcon,
  LinkIcon,
  MapPinIcon,
  ScaleIcon
} from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

import { User } from "@/supabase/models";
import linkConstructor from "@/utils/link-constructor";

interface ProfileDetailsProps {
  profile: User;
}

function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <div className="mx-auto mt-0 grid max-w-3xl grid-cols-1 gap-0 px-4 sm:mt-5 sm:gap-1 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
      <div>
        {profile.full_name && (
          <h1 className="text-2xl font-bold leading-7   text-gray-700 dark:text-gray-100  sm:truncate sm:leading-9">
            {profile.full_name}
          </h1>
        )}
        {profile.bio && (
          <h1 className="text-base  text-gray-500 dark:text-gray-300  sm:truncate">
            {profile.bio}
          </h1>
        )}
      </div>
      <dl className="mt-6 flex flex-col justify-end sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
        {profile.location && (
          <dd className="flex items-center text-sm font-medium  text-gray-500 dark:text-gray-300  sm:mr-6">
            {profile.location}
            <MapPinIcon
              className="ml-1.5 h-5 w-5 shrink-0  text-purple-700 dark:text-purple-400 "
              aria-hidden="true"
            />
          </dd>
        )}

        {profile.website && (
          <dd className="mt-3 flex items-center text-sm font-medium  text-gray-500 dark:text-gray-300  sm:mr-6 sm:mt-0">
            <Link
              href={linkConstructor(profile.website || "")}
              target={"_blank"}
            >
              {linkConstructor(profile.website, true)}
            </Link>
            <LinkIcon
              className="ml-1.5 h-5 w-5 shrink-0  text-purple-700 dark:text-purple-400 "
              aria-hidden="true"
            />
          </dd>
        )}
        {profile.birthdate && (
          <dd className="mt-3 flex items-center text-sm font-medium  text-gray-500 dark:text-gray-300  sm:mr-6 sm:mt-0">
            {profile.birthdate}
            <CalendarDaysIcon
              className="ml-1.5 h-5 w-5 shrink-0  text-purple-700 dark:text-purple-400 "
              aria-hidden="true"
            />
          </dd>
        )}

        {profile.horoscope && (
          <dd className="mt-3 flex items-center text-sm font-medium  text-gray-500 dark:text-gray-300  sm:mr-6 sm:mt-0">
            {profile.horoscope}
            <ScaleIcon
              className="ml-1.5 h-5 w-5 shrink-0  text-purple-700 dark:text-purple-400 "
              aria-hidden="true"
            />
          </dd>
        )}

        {profile.relationship_status && (
          <dd className="mt-3 flex items-center text-sm font-medium  text-gray-500 dark:text-gray-300  sm:mr-6 sm:mt-0">
            {profile.relationship_status}
            <HeartIcon
              className="ml-1.5 h-5 w-5 shrink-0  text-purple-700 dark:text-purple-400 "
              aria-hidden="true"
            />
          </dd>
        )}
      </dl>
    </div>
  );
}

export default ProfileDetails;
