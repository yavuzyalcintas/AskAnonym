"use client";
import "./globals.css";
import { Inter } from "@next/font/google";
import Navbar from "@/src/components/global/Navbar";
import Footer from "@/src/components/global/Footer";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <html lang="en" className="h-full bg-gray-100">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${inter.className} h-full`}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <Navbar />
          {children}
          <Footer />
        </SessionContextProvider>
      </body>
    </html>
  );
}
