import SideBar from "@/ui/SideBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            <SideBar />
            {children}
        </div>
    )
}