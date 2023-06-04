"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormEvent, useState } from "react";

import Button from "@/src/components/common/button/Button";
import Input from "@/src/components/common/input/Input";
import Notification from "@/src/components/common/notification/Notification";
import { Database } from "@/supabase/database";

import { specialCharacterParse } from "../../src/helpers/parser";

const restirectedUsernames = [
  "settings",
  "admin",
  "privacy",
  "terms",
  "t",
  "login"
];

export default function Login() {
  notFound();
  const supabase = useSupabaseClient<Database>();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );

  const usernameLentgh = 15;

  function setUsernameVal(username: string) {
    const user = specialCharacterParse(username);
    if (!user.success) {
      return;
    }
    setUsername(username.replace(/[^a-zA-Z0-9 ]/, "").trim());
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (email === "" || (!isLogin && username === "")) {
      setIsLoading(false);
      return;
    }

    if (!isLogin && username !== "") {
      const usernameValidte = specialCharacterParse(username);
      if (!usernameValidte.success) {
        alert("Kurcalamayin la sunu");
        return;
      }
      // Username validation
      const { data: userData, error } = await supabase
        .from("profiles")
        .select("*")
        .ilike("username", username)
        .maybeSingle();

      if (
        error ||
        userData ||
        restirectedUsernames.some(
          w => w.toLowerCase() === username.toLowerCase()
        )
      ) {
        setErrorMessage("Username is already in use.");
        setIsLoading(false);
        return;
      }
    }

    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const { data } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
        data: {
          username: username,
          avatar_url: `https://ui-avatars.com/api/?color=ffffff&background=${randomColor}&bold=true&size=128&name=${username}`
        }
      }
    });

    if (data) {
      setShow(true);
      setErrorMessage(undefined);

      const { data: userData } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (!isLogin) {
        const templateTopicId = "24f8f30c-293b-4d02-89eb-91492c1015e5";

        await supabase.from("questions").insert({
          question: `${username} kimdir?`,
          user_id: userData?.id!,
          topic_id: templateTopicId
        });

        await supabase.from("user_topics").insert({
          topic_id: templateTopicId,
          user_id: userData?.id!
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="min-h-lg flex flex-col justify-center pt-24 pb-72 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight    text-gray-900 dark:text-gray-50 ">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-100">
            You can filter your incoming questions with creating a profile
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className=" bg-white py-8  px-4 shadow dark:bg-slate-700 sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={e => login(e)}
            >
              {!isLogin && (
                <Input
                  label="Username"
                  name="username"
                  required
                  maxLength={usernameLentgh}
                  type={"text"}
                  placeholder="cool.monkey"
                  value={username}
                  onChange={e => setUsernameVal(e.target.value)}
                />
              )}

              <Input
                label="Email"
                name="email"
                required
                maxLength={100}
                type={"email"}
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}

              {!isLogin && (
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      aria-describedby="candidates-description"
                      name="candidates"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-xs leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      I have read and accepted{" "}
                      <Link
                        className="font-bold text-purple-700"
                        href="terms"
                        target="_blank"
                      >
                        Terms
                      </Link>
                      {" & "}
                      <Link
                        className="font-bold text-purple-700"
                        href="privacy"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
              )}

              <div>
                <Button
                  variant="contained"
                  className="w-full"
                  startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
                  type="submit"
                  isLoading={isLoading}
                >
                  {!isLogin ? "Register" : "Login"}
                </Button>

                <div className="flex justify-center space-x-2 pt-3 text-sm">
                  <div className="text-sm  text-gray-500 dark:text-gray-300  ">
                    {isLogin ? "Get questions from anonymous users" : "or"}
                  </div>

                  <button
                    type="button"
                    className="font-bold  text-purple-700 dark:text-purple-400  "
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Register" : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Notification show={show} setShow={setShow} />
    </>
  );
}
