"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  if (!theme) setTheme(`${systemTheme}`);
  const localTheme = localStorage.getItem("theme");
  const imgSource = localTheme === "dark" ? "/svgs/sun.svg" : "/svgs/moon.svg";

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
