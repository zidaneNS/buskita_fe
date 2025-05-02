'use client';

import { useState } from "react";
import { FaBus, FaChevronRight } from "react-icons/fa";

export default function ScheduleListCard() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="relative z-0 flex flex-col bg-midnight-purple gap-y-4 items-center px-6 md:px-10 py-4 rounded-l-xl w-fit">
            <div className="flex gap-x-2 items-center w-full justify-center">
                <FaBus className="size-8" />
                <h2 className="text-3xl font-semibold">08</h2>
            </div>
            <p>SBY-GSK</p>
            <p>00:00 - 01:00</p>
            <div className={`absolute top-0 w-full ${isOpen ? "left-full" : "left-0"} h-full flex duration-300`}>
                <div className={`h-full w-full bg-black/20 ${isOpen ? "opacity-100" : "opacity-0"} duration-300 flex flex-col justify-between py-2 px-4`}>
                    <div className="w-full flex flex-col gap-y-2 text-xs md:text-sm">
                        <p>Status : Open</p>
                        <p>10 September 2025</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-y-2 w-full md:justify-center gap-x-2">
                        <button className="text-sm md:text-base md:py-2 md:px-4 py-1 rounded-md bg-green-500">Edit</button>
                        <button className="text-sm md:text-base md:py-2 md:px-4 py-1 rounded-md bg-red-500">Delete</button>
                    </div>
                </div>
                <div onClick={() => setIsOpen(prev => !prev)} className="absolute top-0 left-full h-full flex items-center px-2 bg-midnight-purple/40 rounded-r-lg cursor-pointer hover:bg-white/20 duration-300">
                    <FaChevronRight className="size-8" />
                </div>
            </div>
        </div>
    )
}