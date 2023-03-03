"use client";

import React, { useState } from "react";
import { Fragment } from "react";
import { Combobox, Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import Button from "../common/button/Button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { classNames } from "@/src/helpers/tailwindHelper";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "./Avatar";

function Navbar() {
  const user = useUser();
  const router = useRouter();
  const [personList, setPersonList] = useState<{ username: any; avatar_url: any; }[]>([]);
  const supabase = useSupabaseClient();

  async function logout() {
    await supabase.auth.signOut();

    router.push("/");
  }

  async function setSearchQuery(value: string) {
    const { data } = await supabase.from("profiles").select('username,avatar_url').like('username', `%${value}%`).limit(5)
    setPersonList(data ? data : []);
  }

  function goProfile(username: string) {
    router.push(`/${username}`);
  }

  return (
    <>
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto container px-4 h-20 py-5 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <Logo />
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
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
                        <Combobox value='' onChange={goProfile}>
                          <Combobox.Input
                            placeholder="Search"
                            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={(e) => { setSearchQuery(e.target.value) }}></Combobox.Input>
                          <Combobox.Options className="absolute w-full rounded-md bg-white border border-gray-300 bg-white py-2 pl-3 pr-3">

                            {personList.map((person) => (
                              <Combobox.Option className="border-b border-gray-100 py-2" key={person['username']} value={person['username']}>
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={person.avatar_url} alt={person.username} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
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
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  {user && (
                    <>
                      <a
                        href="#"
                        className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </a>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-5 flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white">
                            <span className="sr-only">Open user menu</span>

                            <Avatar
                              username={user?.user_metadata.username}
                              url={user?.user_metadata.avatar_url}
                              size={32}
                            />
                            <div className="text-md pl-2 font-bold text-purple-700">
                              {user?.user_metadata.username}
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {user && (
                              <>
                                <Menu.Item>
                                  <Link
                                    href={"/" + user?.user_metadata.username}
                                    className={classNames(
                                      "block w-full py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    Profile
                                  </Link>
                                </Menu.Item>

                                <Menu.Item>
                                  <button
                                    onClick={() => logout()}
                                    className={classNames(
                                      "block w-full py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    Logout
                                  </button>
                                </Menu.Item>
                              </>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}

                  {!user && (
                    <>
                      <Button
                        href="/login"
                        color="purple-700"
                        variant="contained"
                        className="ml-2"
                      >
                        Login & Register
                      </Button>
                    </>
                  )}

                  <Link
                    href="https://github.com/yavuzyalcintas/AskAnonym"
                    target={"_blank"}
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="ml-5 w-10 h-10 text-gray-700 hover:text-purple-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                {!user && (
                  <Popover.Button
                    onClick={() => router.push("/login")}
                    color="purple-700"
                    className="ml-2"
                  >
                    Login & Register
                  </Popover.Button>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                {user && (
                  <>
                    <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <Avatar
                          username={user.user_metadata.username}
                          url={user?.user_metadata.avatar_url}
                          size={32}
                        />
                      </div>
                      <Popover.Button
                        onClick={() =>
                          router.push("/" + user.user_metadata.username)
                        }
                      >
                        <div className="ml-3">
                          <div className="text-lg font-bold text-purple-700">
                            {user?.user_metadata.username}
                          </div>
                        </div>
                      </Popover.Button>

                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                      <button
                        onClick={() => logout()}
                        className="block w-full rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}

export default Navbar;
