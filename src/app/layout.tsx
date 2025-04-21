import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "BusKita",
  description: "Transportation Solution for Airlangga University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thin scrollbar-track-gradient-end/70 scrollbar-thumb-midnight-purple">
      <body
        className={`${inter.className} antialiased min-h-screen w-full text-white`}
      >
        <div className="w-full h-full bg-gradient-to-b from-gradient-start to-gradient-end flex flex-col">
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
