"use client";

import { Combobox } from "@headlessui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SearchBar() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [personList, setPersonList] = useState<
    { username: any; avatar_url: any }[]
  >([]);

  function goProfile(username: string) {
    router.push(`/${username}`);
  }

  async function setSearchQuery(value: string) {
    const { data } = await supabase
      .from("profiles")
      .select("username,avatar_url")
      .like("username", `%${value}%`)
      .limit(5);
    setPersonList(data ? data : []);
  }

  return (
    <div className="flex items-center px-6 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <Combobox value="" onChange={goProfile}>
            <Combobox.Input
              placeholder="Search"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-purple-700 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-700 sm:text-sm"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            ></Combobox.Input>
            <Combobox.Options className="absolute w-full rounded-md bg-white border border-gray-300 py-2 pl-3 pr-3">
              {personList.map((person) => (
                <Combobox.Option
                  className="border-b border-gray-100 py-2"
                  key={person["username"]}
                  value={person["username"]}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={person.avatar_url}
                        alt={person.username}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 cursor-pointer">
                        {person.username}
                      </p>
                    </div>
                  </div>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
