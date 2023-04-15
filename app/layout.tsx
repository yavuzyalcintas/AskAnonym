"use client";

import "./globals.sass";

import { Inter } from "@next/font/google";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { hotjar } from "react-hotjar";

import { AnalyticsWrapper } from "@/src/components/Analytics";
import Footer from "@/src/components/global/Footer";
import Navbar from "@/src/components/global/Navbar";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    hotjar.initialize(3394021, 6);
  }, []);

  return (
    <html lang="tr" className="h-full ">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta property="og:image" content="https://www.askanonym.com/api/og" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="askanonym.com" />
      <meta property="twitter:url" content="https://www.askanonym.com" />
      <meta name="twitter:title" content="AskAnonym.com - Anonym to You!" />
      <meta
        name="twitter:description"
        content="You can ask question anonymously or register and create a profile for getting questions!"
      />
      <meta
        name="twitter:image"
        content="https://www.askanonym.com/api/og"
      ></meta>

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6495286852739288"
        crossOrigin="anonymous"
      ></script>

      <head />
      <body
        className={`${inter.className} h-full bg-gray-100 dark:bg-slate-900`}
      >
        <SessionContextProvider supabaseClient={supabaseClient}>
          <ThemeProvider attribute="class">
            <Navbar />
            <Toaster position="top-center" />
            {children}
            <Footer />
            <AnalyticsWrapper />
          </ThemeProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
