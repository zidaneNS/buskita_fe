'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavLinkSection from "./NavLinkSection";
import AuthModal from "./AuthModal";

export default function Navbar({ isCo }: { isCo: boolean }) {
    const [isTop, setIsTop] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
            <nav className={`w-full fixed top-0 ${isTop ? "bg-transparent shadow-none" : "bg-gradient-start/95 shadow-xl"} py-4 px-20 z-10 left-0 flex justify-between items-center`}>
                <Link href="/" className="w-fit h-fit">
                    <Image
                        alt="logo"
                        src="/assets/logo.png"
                        width={64}
                        height={30}
                    />
                </Link>
                <NavLinkSection isCo={isCo} />
                <button onClick={() => setIsOpen(true)} className="py-2 px-4 rounded-lg bg-white text-gradient-start text-sm font-semibold hover:text-white hover:bg-midnight-purple duration-300 cursor-pointer">Sign In</button>
            </nav>
            <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}