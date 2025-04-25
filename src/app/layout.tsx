import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";
import { verifyCo } from "@/lib/action";
import React from "react";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "BusKita",
  description: "Transportation Solution for Airlangga University",
};

export default async function RootLayout({
  children,
  auth
}: Readonly<{
  children: React.ReactNode,
  auth: React.ReactNode
}>) {
  const isCo = await verifyCo();
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-gradient-end/70 scrollbar-thumb-midnight-purple">
      <body
        className={`${inter.className} antialiased min-h-screen w-full text-white`}
      >
        <div className="w-full h-full bg-gradient-to-b from-gradient-start to-gradient-end flex flex-col">
          <Navbar isCo={isCo} />
          {children}
          {auth}
        </div>
        <Footer />
      </body>
    </html>
  );
}
