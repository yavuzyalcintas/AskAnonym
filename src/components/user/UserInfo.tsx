"use client";

import { CalendarIcon, MapIcon } from "@heroicons/react/24/outline";
import React, { FC, ReactNode } from "react";

export const UserInfo = () => {
  return (
    <>
      <hr className="my-2" />
      <div className="my-1 py-1 block">
        <div className="w-full">
          <UserInfoText
            text="I`m a software developer. I`m interesting in ReactJS, NextJS and
              same things. This text`ll be max 144 character and others`ll write
              their info."
          />
        </div>
        <div className="flex justify-start items-center gap-3 mt-0.5">
          <UserInfoText
            text={"05.03.2023"}
            icon={<CalendarIcon className="w-4 h-4" />}
          />
          <UserInfoText
            text={"Istanbul/TURKIYE"}
            icon={<MapIcon className="w-4 h-4" />}
          />
        </div>
      </div>
    </>
  );
};

const UserInfoText: FC<{
  text: string;
  icon?: ReactNode;
}> = ({ text, icon }) => {
  return (
    <span className="flex justify-start gap-2 text-xs text-gray-500 items-center">
      {!!icon && icon}
      <p className="p-0 m-0 mt-0.5">{text}</p>
    </span>
  );
};
