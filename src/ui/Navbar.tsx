'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinkSection from "./NavLinkSection";
import MobileNavLinkSection from "./MobileNavLinkSection";
import { useRouter } from "next/navigation";
import { User } from "@/lib/type";
import { logout } from "@/lib/auth";
import { FaChevronRight } from "react-icons/fa";
import { CiLogout, CiSettings } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

export default function Navbar({ isCo, user }: { isCo: boolean, user: User | undefined | null }) {
    const [isTop, setIsTop] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsTop(window.scrollY === 0);
        };

        handleScroll(); 
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isTop]);
    return (
        <>
            <nav className={`w-screen fixed top-0 ${isTop ? "bg-transparent shadow-none" : "bg-gradient-start/95 shadow-xl"} py-4 px-8 md:px-20 z-10 left-0 flex justify-between items-center`}>
                <Link href="/" className="w-fit h-fit">
                    <Image
                        alt="logo"
                        src="/assets/logo.png"
                        width={64}
                        height={30}
                    />
                </Link>

                {/* Desktop */}
                <NavLinkSection isCo={isCo} />
                {user ? (
                    <div className="hidden md:block relative cursor-pointer hover:bg-slate-700/80 py-1 px-3 rounded-md duration-300">
                        <div onClick={() => setIsOpen(prev => !prev)} className="w-full flex gap-x-2 items-center">
                            <FaChevronRight className={`size-4 ${isOpen && "rotate-90"} duration-300`} />
                            <p className="text-sm">{user.name}</p>
                        </div>
                        <div className={`absolute top-full right-0 ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} mt-2 flex flex-col gap-y-4 bg-purple-800 py-4 px-6 rounded-lg shadow-xl min-w-64 origin-top duration-300`}>
                            <p className="w-full pb-2 border-b border-white text-sm text-center">{user.nim_nip}</p>
                            <p className="w-full pb-2 border-b border-white text-sm text-center">{user.email}</p>
                            <button className="py-2 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-200/50 duration-300 cursor-pointer flex gap-x-3 items-center justify-center">
                                <CiSettings className="size-6" />
                                <p>Dashboard</p>
                            </button>
                            <button onClick={handleLogout} className="py-2 rounded-lg bg-white text-gradient-start text-sm hover:text-white hover:bg-slate-200/50 duration-300 cursor-pointer flex gap-x-3 items-center justify-center">
                                <CiLogout className="size-6" />
                                <p>Logout</p>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => router.push('/auth')} className="hidden md:block py-2 px-4 rounded-lg bg-white text-gradient-start text-sm font-semibold hover:text-white hover:bg-midnight-purple duration-300 cursor-pointer">Sign In</button>
                )}

                {/* Mobile */}
                <GiHamburgerMenu onClick={() => setIsOpen(true)} className="size-8 cursor-pointer md:hidden block" />
                <div className={`h-screen bg-gradient-to-b from-dark-purple via-purple-950 to-purple-900/95 min-w-64 md:hidden flex flex-col gap-y-3 fixed top-0 shadow-xl ${isOpen ? "right-0" : "-right-full"} duration-300 py-4 px-6`}>
                        <MdClose onClick={() => setIsOpen(false)} className="size-8 cursor-pointer" />
                        {user ? (
                            <div className="flex flex-col gap-y-3">
                                <p className="w-full pb-2 border-b border-white text-sm text-center">{user.nim_nip}</p>
                                <p className="w-full pb-2 border-b border-white text-sm text-center">{user.email}</p>
                                <button className="py-2 rounded-lg bg-slate-700 text-white text-sm hover:bg-slate-200/50 duration-300 cursor-pointer flex gap-x-3 items-center justify-center">
                                    <CiSettings className="size-6" />
                                    <p>Dashboard</p>
                                </button>
                                <button onClick={handleLogout} className="py-2 rounded-lg bg-white text-gradient-start text-sm hover:text-white hover:bg-slate-200/50 duration-300 cursor-pointer flex gap-x-3 items-center justify-center">
                                    <CiLogout className="size-6" />
                                    <p>Logout</p>
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => router.push('/auth')} className="block md:hidden py-2 px-4 rounded-lg bg-white text-gradient-start text-sm font-semibold hover:text-white hover:bg-midnight-purple duration-300 cursor-pointer">Sign In</button>
                        )}
                        <MobileNavLinkSection isCo={isCo} />
                </div>
            </nav>
        </>
    )
}