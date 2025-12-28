import { getUser } from "@/lib/dal";
import { user } from "@/mockup/user";
import SideBar from "@/ui/SideBar";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    // const user = await getUser();
    return (
        <div className="flex min-h-screen w-full">
            <SideBar user={user} />
            {children}
        </div>
    )
}