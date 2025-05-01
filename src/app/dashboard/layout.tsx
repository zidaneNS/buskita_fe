import DashboardLinkSection from "@/ui/DashboardLinkSection";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            <aside className="w-1/6 hidden md:flex flex-col h-screen bg-midnight-purple/15 border-r border-white border-dashed py-8 gap-y-12 px-4 text-sm">
                <Link href="/schedule" className="flex items-center gap-x-3 cursor-pointer hover:underline w-fit pb-3">
                    <FaArrowLeft className="size-4" />
                    <p>Back to schedule</p>
                </Link>
                <DashboardLinkSection />
                <button className="mt-auto py-2 rounded-lg bg-white text-gradient-start text-sm hover:text-white hover:bg-slate-200/50 duration-300 cursor-pointer flex gap-x-3 items-center justify-center">
                    <CiLogout className="size-4" />
                    <p>Logout</p>
                </button>
            </aside>
            {children}
        </div>
    )
}