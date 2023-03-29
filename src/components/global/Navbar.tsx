"use client";

import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

import { classNames } from "@/src/helpers/tailwindHelper";
import { User } from "@/supabase/models";

import Button from "../common/button/Button";
import Avatar from "./Avatar";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Navbar() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      const { data: ownerUser, error } = await supabase
        .from("profiles")
        .select(
          `*,
          is_verified:verified_users(*)`
        )
        .eq("id", session?.user.id)
        .single();

      setUser(ownerUser as User);
    };

    fetchData();
  }, [supabase, setUser, session]);

  async function logout() {
    await supabase.auth.signOut();

    router.push("/");
  }

  return (
    <>
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            " bg-white dark:bg-slate-800 shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="container mx-auto h-20 px-4 py-3 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex shrink-0 items-center">
                    <Logo />
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <SearchBar />
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-300">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>

                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  <div className="inline-flex w-full items-center justify-between">
                    <iframe
                      src="https://github.com/sponsors/yavuzyalcintas/button"
                      title="Sponsor yavuzyalcintas"
                      height="32"
                      width="114"
                    ></iframe>

                    <div className=" inline-flex items-center  space-x-4">
                      <DarkModeToggle />
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
                    </div>
                  </div>
                  {user && (
                    <>
                      {/* <a
                        href="#"
                        className="ml-5 flex-shrink-0 rounded-full  bg-white dark:bg-slate-700  p-1 text-gray-400 hover: text-gray-500 dark:text-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </a> */}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-5 shrink-0">
                        <div>
                          <Menu.Button className="flex bg-white dark:bg-slate-800 ">
                            <span className="sr-only">Open user menu</span>

                            <div className="pr-2 pt-1 text-lg font-bold  text-purple-700 dark:text-purple-400 ">
                              {user.username}
                            </div>
                            <Avatar
                              username={user.username}
                              url={user.avatar_url}
                              size={40}
                            />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  bg-white py-1  shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-700">
                            {user && (
                              <>
                                <Menu.Item>
                                  <Link
                                    href={"/" + user.username}
                                    className={classNames(
                                      "block w-full py-2 px-4 text-sm   text-gray-700 dark:text-gray-100 "
                                    )}
                                  >
                                    Profile
                                  </Link>
                                </Menu.Item>

                                <Menu.Item>
                                  <Link
                                    href={"/settings"}
                                    className={classNames(
                                      "block w-full py-2 px-4 text-sm   text-gray-700 dark:text-gray-100 "
                                    )}
                                  >
                                    Settings
                                  </Link>
                                </Menu.Item>

                                <Menu.Item>
                                  <button
                                    onClick={() => logout()}
                                    className={classNames(
                                      "block w-full py-2 px-4 text-sm   text-gray-700 dark:text-gray-100 "
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
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto flex max-w-3xl justify-between space-y-1 px-4 pt-2 pb-3 sm:px-4">
                {!user && (
                  <Popover.Button
                    onClick={() => router.push("/login")}
                    color="purple-700"
                    className="ml-2 dark:text-gray-100"
                  >
                    Login & Register
                  </Popover.Button>
                )}
                <DarkModeToggle />
                <iframe
                  src="https://github.com/sponsors/yavuzyalcintas/button"
                  title="Sponsor yavuzyalcintas"
                  height="32"
                  width="114"
                ></iframe>
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                {user && (
                  <>
                    <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6">
                      <div className="inline-flex">
                        <div className="shrink-0">
                          <Avatar
                            username={user.username}
                            url={user.avatar_url}
                            size={32}
                          />
                        </div>
                        <Popover.Button
                          onClick={() => router.push("/" + user.username)}
                        >
                          <div className="ml-3">
                            <div className="text-lg font-bold  text-purple-700 dark:text-purple-400 ">
                              {user.username}
                            </div>
                          </div>
                        </Popover.Button>
                      </div>

                      <Popover.Button onClick={() => router.push("/settings")}>
                        <div className="ml-3 dark:text-white">Settings</div>
                      </Popover.Button>

                      {/* <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full  bg-white dark:bg-slate-700  p-1 text-gray-400 hover: text-gray-500 dark:text-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}
                    </div>

                    <div className="mx-auto mt-10 max-w-3xl space-y-1 px-2 sm:px-4">
                      <button
                        onClick={() => logout()}
                        className="  block w-full rounded-md bg-gray-50 py-2 px-3  text-base font-medium  text-gray-900 hover:text-gray-500 dark:bg-gray-500    dark:text-gray-300 hover:dark:text-gray-50 "
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
