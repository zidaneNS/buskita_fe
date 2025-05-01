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
        <div className="hidden md:flex w-fit gap-x-2 justify-between">
            {links.map((link, i) => (
                <Link 
                    href={link.href}
                    key={i}
                    className={`py-2 px-4 rounded-lg hover:bg-midnight-purple hover:text-ungu-muda duration-300 ${pathname === link.href ? "bg-midnight-purple" : "bg-transparent"}`}
                >
                    {link.text}
                </Link>
            ))}
        </div>
    )
}