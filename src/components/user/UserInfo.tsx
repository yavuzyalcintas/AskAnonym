"use client";

import { CalendarIcon, MapIcon } from "@heroicons/react/24/outline";
import React, { FC, ReactNode } from "react";

const UserInfoText: FC<{
  text: string;
  icon?: ReactNode;
}> = ({ text, icon }) => {
  return (
    <span className="flex items-center justify-start gap-2 text-xs text-gray-500">
      {!!icon && icon}
      <p className="m-0 mt-0.5 p-0">{text}</p>
    </span>
  );
};

export const UserInfo = () => {
  return (
    <>
      <hr className="my-2" />
      <div className="my-1 block py-1">
        <div className="w-full">
          <UserInfoText
            text="I`m a software developer. I`m interesting in ReactJS, NextJS and
              same things. This text`ll be max 144 character and others`ll write
              their info."
          />
        </div>
        <div className="mt-0.5 flex items-center justify-start gap-3">
          <UserInfoText
            text={"05.03.2023"}
            icon={<CalendarIcon className="h-4 w-4" />}
          />
          <UserInfoText
            text={"Istanbul/TURKIYE"}
            icon={<MapIcon className="h-4 w-4" />}
          />
        </div>
      </div>
    </>
  );
};
