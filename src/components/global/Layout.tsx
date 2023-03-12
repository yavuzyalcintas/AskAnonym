"use client";

import {
  ChatBubbleLeftEllipsisIcon,
  PlusIcon
} from "@heroicons/react/20/solid";
import {
  ArrowTrendingUpIcon,
  FireIcon,
  HomeIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { classNames } from "@/src/helpers/tailwindHelper";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Popular", href: "#", icon: FireIcon, current: false },
  { name: "Communities", href: "#", icon: UserGroupIcon, current: false },
  { name: "Trending", href: "#", icon: ArrowTrendingUpIcon, current: false }
];
const communities = [
  { name: "Movies", href: "#" },
  { name: "Food", href: "#" },
  { name: "Sports", href: "#" },
  { name: "Animals", href: "#" },
  { name: "Science", href: "#" },
  { name: "Dinosaurs", href: "#" },
  { name: "Talents", href: "#" },
  { name: "Gaming", href: "#" }
];
const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "Most Liked", href: "#", current: false },
  { name: "Most Answers", href: "#", current: false }
];

const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291
  }
  // More posts...
];

export default function Layout() {
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="container mx-auto sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8">
            <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="space-y-1 pb-8">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-200    text-gray-900 dark:text-gray-50 "
                          : "  text-gray-700 dark:text-gray-100  hover: bg-gray-50 dark:bg-gray-500 ",
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? " text-gray-500 dark:text-gray-300 "
                            : "text-gray-400 group-hover: text-gray-500 dark:text-gray-300 ",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  ))}
                </div>
                <div className="pt-10">
                  <p
                    className="px-3 text-sm font-medium  text-gray-500 dark:text-gray-300 "
                    id="communities-headline"
                  >
                    Communities
                  </p>
                  <div
                    className="mt-3 space-y-2"
                    aria-labelledby="communities-headline"
                  >
                    {communities.map(community => (
                      <a
                        key={community.name}
                        href={community.href}
                        className=" group flex items-center rounded-md bg-gray-50 px-3   py-2 text-sm  font-medium   text-gray-900 hover:text-gray-700 dark:bg-gray-500  dark:text-gray-100  hover:dark:text-gray-50"
                      >
                        <span className="truncate">{community.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-6">
              <div className="px-4 sm:px-0">
                <div className="sm:hidden">
                  <label htmlFor="question-tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="question-tabs"
                    className="block w-full rounded-md border-gray-300 text-base font-medium    text-gray-900 shadow-sm  focus:border-purple-500 focus:ring-purple-500 dark:text-gray-50"
                    defaultValue={tabs.find(tab => tab.current)?.name}
                  >
                    {tabs.map(tab => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav
                    className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? "page" : undefined}
                        className={classNames(
                          tab.current
                            ? "   text-gray-900 dark:text-gray-50 "
                            : " text-gray-500 dark:text-gray-300  hover:  text-gray-700 dark:text-gray-100 ",
                          tabIdx === 0 ? "rounded-l-lg" : "",
                          tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                          "group relative min-w-0 flex-1 overflow-hidden  bg-white dark:bg-slate-700  py-4 px-6 text-sm font-medium text-center hover: bg-gray-50 dark:bg-gray-500  focus:z-10"
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? "bg-purple-500" : "bg-transparent",
                            "absolute inset-x-0 bottom-0 h-0.5"
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="mt-4"></div>
            </main>
            <aside className="hidden xl:col-span-4 xl:block">
              <div className="sticky top-4 space-y-4">
                <section aria-labelledby="who-to-follow-heading">
                  <div className="rounded-lg  bg-white shadow  dark:bg-slate-700">
                    <div className="p-6">
                      <h2
                        id="who-to-follow-heading"
                        className="text-base font-medium    text-gray-900 dark:text-gray-50 "
                      >
                        Who to follow
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
                          {whoToFollow.map(user => (
                            <li
                              key={user.handle}
                              className="flex items-center space-x-3 py-4"
                            >
                              <div className="shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium    text-gray-900 dark:text-gray-50 ">
                                  <a href={user.href}>{user.name}</a>
                                </p>
                                <p className="text-sm  text-gray-500 dark:text-gray-300 ">
                                  <a href={user.href}>{"@" + user.handle}</a>
                                </p>
                              </div>
                              <div className="shrink-0">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-full bg-purple-50 px-3 py-0.5 text-sm font-medium  text-purple-700 hover:bg-purple-100  dark:text-purple-400"
                                >
                                  <PlusIcon
                                    className="-ml-1 mr-0.5 h-5 w-5 text-purple-400"
                                    aria-hidden="true"
                                  />
                                  <span>Follow</span>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="hover: block w-full rounded-md border  border-gray-300 bg-white  bg-gray-50 px-4 py-2 text-center text-sm   font-medium text-gray-700 shadow-sm dark:bg-gray-500   dark:bg-slate-700 dark:text-gray-100"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="trending-heading">
                  <div className="rounded-lg  bg-white shadow  dark:bg-slate-700">
                    <div className="p-6">
                      <h2
                        id="trending-heading"
                        className="text-base font-medium    text-gray-900 dark:text-gray-50 "
                      >
                        Trending
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
                          {trendingPosts.map(post => (
                            <li key={post.id} className="flex space-x-3 py-4">
                              <div className="shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={post.user.imageUrl}
                                  alt={post.user.name}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-800">
                                  {post.body}
                                </p>
                                <div className="mt-2 flex">
                                  <span className="inline-flex items-center text-sm">
                                    <button
                                      type="button"
                                      className="hover: inline-flex space-x-2 text-gray-400 text-gray-500 dark:text-gray-300 "
                                    >
                                      <ChatBubbleLeftEllipsisIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                      <span className="font-medium    text-gray-900 dark:text-gray-50 ">
                                        {post.comments}
                                      </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="hover: block w-full rounded-md border  border-gray-300 bg-white  bg-gray-50 px-4 py-2 text-center text-sm   font-medium text-gray-700 shadow-sm dark:bg-gray-500   dark:bg-slate-700 dark:text-gray-100"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
