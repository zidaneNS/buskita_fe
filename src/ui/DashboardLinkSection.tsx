'use client';

import { Role, User } from "@/lib/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { AiFillSchedule } from "react-icons/ai";
import { BiScan } from "react-icons/bi";
import { FaBus, FaHome, FaUser } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

export type DashboardLinkType = {
    icon: IconType,
    text: string,
    href: string,
    allowedRoles: Role[],
    description?: string,
    buttonText?: string,
    title?: string
}

export const dashboardLinks: DashboardLinkType[] = [
    {
        icon: FaHome,
        text: 'Home',
        href: '/dashboard',
        allowedRoles: ['passenger', 'co', 'co_leader'],
        description: 'View available options',
        buttonText: 'Back Home',
        title: 'Home'
    },
    {
        icon: FaUser,
        text: 'Profile',
        href: '/dashboard/profile',
        allowedRoles: ['passenger', 'co', 'co_leader'],
        description: 'View and manage user profile',
        buttonText: 'Manage Profile',
        title: 'Profile Management'
    },
    {
        icon: AiFillSchedule,
        text: 'Schedule',
        href: '/dashboard/schedule',
        allowedRoles: ['co', 'co_leader'],
        description: 'View and manage bus schedules',
        buttonText: 'View Schedules',
        title: 'Schedule Management'
    },
    {
        icon: FaBus,
        text: 'Bus',
        href: '/dashboard/bus',
        allowedRoles: ['co', 'co_leader'],
        description: 'View and manage buses',
        buttonText: 'View Buses',
        title: 'Bus Management'
    },
    {
        icon: MdManageAccounts,
        text: 'User',
        href: '/dashboard/user',
        allowedRoles: ['co', 'co_leader'],
        description: 'View and manage users',
        buttonText: 'Manage Users',
        title: 'User Management'
    },
    {
        icon: BiScan,
        text: 'Verify',
        href: '/dashboard/verify',
        allowedRoles: ['co', 'co_leader'],
        description: 'Verify passenger with QR code',
        buttonText: 'Verify Passengers',
        title: 'Passenger Verification'
    },
];
export default function DashboardLinkSection({ user }: { user: User }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-full gap-y-2">
            {dashboardLinks.map((link, id) => {
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