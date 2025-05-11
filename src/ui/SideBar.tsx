'use client';

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import DashboardLinkSection from "./DashboardLinkSection";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { User } from "@/lib/type";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function SideBar({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.push('/');
    }
    return (
        <aside className={`w-48 md:w-1/6 z-10 fixed md:static flex flex-col h-screen bg-black/30 backdrop-blur-xl border-r border-white border-dashed py-8 gap-y-12 px-4 text-sm duration-300 ${isOpen ? "left-0" : "-left-48"}`}>
            <div onClick={() => setIsOpen(prev => !prev)} className={`flex justify-center items-center absolute md:hidden left-full top-1/2 bg-black/95 rounded-r-full py-8`}>
                <MdKeyboardDoubleArrowRight className={`size-8 ${isOpen && "rotate-180"}`}/>
            </div>
            <Link href="/schedule" className="flex items-center gap-x-3 cursor-pointer hover:underline w-fit pb-3">
                <FaArrowLeft className="size-4" />
                <p>Back to schedule</p>
            </Link>
            <DashboardLinkSection user={user} />
            <button onClick={handleLogout} className="mt-auto py-2 rounded-lg bg-white text-gradient-start text-sm hover:text-white hover:bg-slate-200/50 duration-300 cursor-pointer flex gap-x-3 items-center justify-center">
                <CiLogout className="size-4" />
                <p>Logout</p>
            </button>
        </aside>
    )
}