"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) setTheme(`${systemTheme}`);
    if (!theme) setTheme(`${localTheme}`);
  }, [setTheme, theme, systemTheme]);

  const imgSource = theme === "dark" ? "/svgs/sun.svg" : "/svgs/moon.svg";

  return (
    <div className=" ml-6">
      <div
        onClick={() => {
          theme == "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <Image
          src={imgSource}
          alt="Darkmode"
          width={30}
          height={30}
          unoptimized
        />
      </div>
    </div>
  );
}
