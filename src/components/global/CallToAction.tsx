import { UserIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import Button from "../common/button/Button";

export default function CallToAction() {
  return (
    <div className="relative isolate my-5 overflow-hidden rounded-lg bg-gray-300 py-24 sm:py-32">
      <Image
        src="/images/cta-bg.png"
        alt="cta"
        width={1024}
        height={768}
        className=" absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <svg
          viewBox="0 0 1266 975"
          aria-hidden="true"
          className="absolute -bottom-8 -left-96 -z-10 w-[79.125rem] transform-gpu blur-3xl sm:-left-40 sm:-bottom-64 lg:left-8 lg:-bottom-32 xl:-left-10"
        >
          <path
            fill="url(#05f95398-6ec0-404d-8f7d-a69a4504684d)"
            fillOpacity=".2"
            d="M347.52 746.149 223.324 974.786 0 630.219l347.52 115.93 223.675-411.77c1.431 190.266 49.389 498.404 229.766 208.829C1026.43 181.239 966.307-135.484 1129.51 59.422c130.55 155.925 143.15 424.618 133.13 539.473L936.67 429.884l23.195 520.539L347.52 746.149Z"
          />
          <defs>
            <linearGradient
              id="05f95398-6ec0-404d-8f7d-a69a4504684d"
              x1="1265.86"
              x2="-162.888"
              y1=".254"
              y2="418.947"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <h2 className="text-base font-semibold leading-8 text-purple-400">
            AskAnonym.com
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Anonym to You!
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            You can ask question anonymously or register and create a profile
            for getting questions!
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            startIcon={<UserIcon className="h-5 w-5" />}
            href="/login"
            className="mt-8 w-1/3"
            size="semi-medium"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
