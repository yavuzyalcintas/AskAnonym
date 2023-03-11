"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  if (!theme) setTheme("dark");

  return (
    <div className=" ml-6">
      <div
        onClick={() => {
          theme == "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <Image
          src={theme === "dark" ? "/svgs/sun.svg" : "/svgs/moon.svg"}
          alt="Darkmode"
          width={30}
          height={30}
          unoptimized
        />
      </div>
    </div>
  );
}
