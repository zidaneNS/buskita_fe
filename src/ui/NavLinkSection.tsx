'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkType = {
    text: string,
    href: string
}

export default function NavLinkSection({ isCo }: { isCo: boolean }) {
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
            text: 'Manage',
            href: '#'
        },
        {
            text: 'My Schedule',
            href: '/myschedule'
        }
    ]
    return (
        <div className="flex w-fit gap-x-2 justify-between">
            {links.map((link, i) => {
                if (link.text === 'Manage' && !isCo) return null;
                return (
                    <Link 
                        href={link.href}
                        key={i}
                        className={`py-2 px-4 rounded-lg hover:bg-midnight-purple hover:text-ungu-muda duration-300 ${pathname === link.href ? "bg-midnight-purple" : "bg-transparent"}`}
                    >
                        {link.text}
                    </Link>
                )
            })}
        </div>
    )
}