'use client';

import Link from "next/link";
import { dashboardLinks } from "./DashboardLinkSection";
import { User } from "@/lib/type";

export default function DashboardHomeSection({ user }: { user: User }) {
    const filteredLinks = dashboardLinks.filter(link => link.allowedRoles.includes(user.role?.name || 'user'));
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 gap-y-3">
            {filteredLinks.map((link, i) => (
                <div key={i} className="flex flex-col w-full px-6 py-4 md:px-8 md:py-6 gap-y-3 md:gap-y-4 bg-black/40 border border-dark-purple rounded-lg h-fit shadow-xl">
                    <link.icon className="text-midnight-purple size-8 md:size-10" />
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl md:text-2xl font-bold">{link.title}</h2>
                        <p className="text-xs md:text-sm">{link.description}</p>
                    </div>
                    <Link href={link.href} className="text-sm md:text-base w-full py-3 rounded-md bg-black/40 border border-dark-purple text-center cursor-pointer hover:bg-white/30 duration-300">{link.buttonText}</Link>
                </div>
            ))}
        </section>
    )
}