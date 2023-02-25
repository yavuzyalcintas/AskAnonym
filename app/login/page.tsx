"use client";

import Button from "@/src/components/common/button/Button";
import Input from "@/src/components/common/input/Input";
import Notification from "@/src/components/common/notification/Notification";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, Fragment, useState } from "react";

export default function Login() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  async function login(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (email === "" || (!isLogin && username === "")) {
      return;
    }

    const { data } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        data: {
          username: username,
          avatar_url:
            "https://ui-avatars.com/api/?color=ffffff&background=f8c308&bold=true&size=128&name=" +
            username,
        },
      },
    });

    if (data) {
      setShow(true);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="flex min-h-lg flex-col justify-center pt-24 pb-72 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You can filter your incoming questions with creating a profile
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              {!isLogin && (
                <Input
                  label="Username"
                  name="username"
                  required
                  type={"text"}
                  placeholder="cool.monkey"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}

              <Input
                label="Email"
                name="email"
                required
                type={"email"}
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Button
                  variant="contained"
                  className="w-full"
                  startIcon={
                    isLoading ? undefined : (
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    )
                  }
                  type="submit"
                  isLoading={isLoading}
                  onClick={(e) => login(e)}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Notification show={show} setShow={setShow} />
    </>
  );
}
