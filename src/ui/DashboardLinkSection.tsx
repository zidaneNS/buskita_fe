'use client';

import { Role, User } from "@/lib/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { AiFillSchedule } from "react-icons/ai";
import { BiScan } from "react-icons/bi";
import { FaBus, FaUser } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

type LinkType = {
    icon: IconType,
    text: string,
    href: string,
    allowedRoles: Role[]
}

export default function DashboardLinkSection({ user }: { user: User }) {
    const pathname = usePathname();
    const links: LinkType[] = [
        {
            icon: FaUser,
            text: 'Profile',
            href: '/dashboard/profile',
            allowedRoles: ['passenger', 'co', 'co_leader']
        },
        {
            icon: AiFillSchedule,
            text: 'Schedule',
            href: '/dashboard/schedule',
            allowedRoles: ['co', 'co_leader']
        },
        {
            icon: FaBus,
            text: 'Bus',
            href: '/dashboard/bus',
            allowedRoles: ['co', 'co_leader']
        },
        {
            icon: MdManageAccounts,
            text: 'User',
            href: '/dashboard/user',
            allowedRoles: ['co', 'co_leader']
        },
        {
            icon: BiScan,
            text: 'Verify',
            href: '/dashboard/verify',
            allowedRoles: ['co', 'co_leader']
        },
    ]
    return (
        <div className="flex flex-col w-full gap-y-2">
            {links.map((link, id) => {
                if (link.allowedRoles.includes(user.role_name)) return (
                    <Link key={id} href={link.href} className={`flex items-center gap-x-3 cursor-pointer py-2 px-4 rounded-md hover:bg-white/50 duration-300 w-full ${pathname === link.href ? "bg-white/50" : "bg-white/10"}`}>
                        <link.icon className="size-4" />
                        <p>{link.text}</p>
                    </Link>
                )
            })}
        </div>
    )
}