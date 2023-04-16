"use client";

import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Loader from "../common/loader/Loader";
let timer: ReturnType<typeof setTimeout>;
const queryLimit = 1;
function SearchBar() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [personList, setPersonList] = useState<
    { username: any; avatar_url: any }[]
  >([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  function goProfile(username: string) {
    router.push(`/${username}`);
  }
  const fetchSuggestions = (val: string) => {
    setLoading(true);
    setPersonList([]);
    if (val.length >= queryLimit) {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          const { data } = await supabase
            .from("profiles")
            .select("username,avatar_url")
            .ilike("username", `%${val}%`)
            .limit(5);
          setPersonList(data ? data : []);
        } catch (error) {
          throw new Error("Error fetching suggestions");
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  };
  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);
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
              placeholder="Search users"
              className=" mt-3 block w-full  rounded-md border 
               border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 focus:border-purple-700 
                 focus:outline-none  focus:ring-1   focus:ring-purple-700 focus:placeholder:text-gray-400 
                  dark:bg-slate-700 dark:text-gray-200 dark:focus:placeholder:text-gray-200 
                    sm:text-sm"
              onChange={e => {
                setQuery(e.target.value);
              }}
            ></Combobox.Input>
            {query.length >= queryLimit && (
              <Combobox.Options className="absolute z-30 w-full content-center rounded-md border border-gray-300 bg-white p-2 dark:bg-slate-700">
                {personList.map((person, i, arr) => (
                  <Combobox.Option
                    className={cx(
                      "border-b border-gray-100 px-1 py-2 rounded-md transition-all cursor-pointer hover:bg-gray-100 hover:px-2",
                      {
                        "border-none": i === arr.length - 1
                      }
                    )}
                    key={person["username"]}
                    value={person["username"]}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={person.avatar_url}
                          alt={person.username}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-50 ">
                          {person.username}
                        </p>
                      </div>
                    </div>
                  </Combobox.Option>
                ))}
                <div className="flex w-full justify-center">
                  {!isLoading && personList.length === 0 && (
                    <div className="py-2 text-center text-sm">
                      No results found
                    </div>
                  )}
                  {isLoading && <Loader color="#000" size={28} />}
                </div>
              </Combobox.Options>
            )}
          </Combobox>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
