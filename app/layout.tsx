"use client";

import "./globals.sass";

import { Inter } from "@next/font/google";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
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
    <html lang="tr" className="h-full bg-gray-100">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta property="og:image" content="https://www.askanonym.com/api/og" />
      <head />
      <body className={`${inter.className} h-full`}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <Navbar />
          {/* <AppStatus /> */}
          {children}
          <Footer />
          <AnalyticsWrapper />
        </SessionContextProvider>
      </body>
    </html>
  );
}
