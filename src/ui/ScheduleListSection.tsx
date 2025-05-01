'use client';

import { useState } from "react";
import { FaBus, FaChevronRight } from "react-icons/fa";

export default function ScheduleListSection() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-y-4 w-full">
            <div className="flex max-w-full">
                <div className="flex flex-col bg-midnight-purple gap-y-4 items-center px-6 py-4 rounded-l-xl">
                    <div className="flex gap-x-2 items-center w-full justify-center">
                        <FaBus className="size-8" />
                        <h2 className="text-3xl font-semibold">08</h2>
                    </div>
                    <p>SBY-GSK</p>
                    <p>00:00 - 01:00</p>
                </div>
                <div className={`${isOpen ? "w-1/3" : "w-0"} duration-300 bg-gradient-to-l from-black/20 to-midnight-purple/20`}>

                </div>
                <div onClick={() => setIsOpen(prev => !prev)} className="flex flex-col justify-center px-2 bg-black/50 cursor-pointer hover:bg-black/70 rounded-r-xl duration-300">
                    <FaChevronRight className={`size-10 ${isOpen && "rotate-180"} duration-300`} />
                </div>
            </div>
        </div>
    )
}