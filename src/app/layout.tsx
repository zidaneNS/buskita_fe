import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

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
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screen w-full text-white`}
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
