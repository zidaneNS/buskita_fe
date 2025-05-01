'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkType = {
    text: string,
    href: string
}

export default function NavLinkSection() {
    const pathname = usePathname();
    const links: NavLinkType[] = [
        {
            text: 'Schedule',
            href: '/schedule'
        },
        {
            text: 'Telegram',
            href: '#'
        },
        {
            text: 'My Schedule',
            href: '/myschedule'
        }
    ]
    return (
        <div className="mt-8 flex flex-col md:hidden w-full gap-y-2 justify-between">
            {links.map((link, i) => (
                <Link 
                href={link.href}
                key={i}
                className={`py-2 px-4 rounded-lg hover:bg-white/80 text-center w-full duration-300 ${pathname === link.href ? "bg-white/80 text-dark-purple" : "bg-midnight-purple "}`}
                >
                    {link.text}
                </Link>
            ))}
        </div>
    )
}