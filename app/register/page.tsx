"use client";

import Button from "@/src/components/common/button/Button";
import Input from "@/src/components/common/input/Input";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Register() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function register(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    const { data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullname,
          username,
        },
      },
    });

    if (data) {
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex min-h-lg flex-col justify-center pt-24 pb-72 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <Input
                label="Full Name"
                name="fullname"
                required
                type={"text"}
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

              <Input
                label="Username"
                name="username"
                required
                type={"text"}
                placeholder="john.doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                label="Email"
                name="email"
                required
                type={"email"}
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                name="password"
                required
                type={"password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    required
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I accept terms and conditions
                  </label>
                </div>
              </div>

              <div>
                <Button
                  variant="contained"
                  className="w-full"
                  startIcon={<CheckIcon className="w-5 h-5" />}
                  type="submit"
                  onClick={(e) => register(e)}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
