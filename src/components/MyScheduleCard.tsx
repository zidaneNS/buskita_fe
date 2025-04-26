'use client';

import { useRouter } from "next/navigation";
import { FaBusAlt } from "react-icons/fa";

export default function MyScheduleCard({ id }: { id: number | string }) {
    const router = useRouter();
    return (
        <div className="bg-white shadow-xl text-black flex flex-col gap-y-6 px-6 py-4 rounded-xl hover:-translate-y-3 duration-300">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <FaBusAlt className="size-5" />
                    <p className="text-xl font-bold">SBY - GSK</p> 
                </div>
                <p className="text-sm font-semibold">06:00 - 07:00</p>
            </div>
            <div className="flex justify-between mt-auto items-center">
                <div className="flex flex-col w-full text-sm">
                    <p><span className="font-semibold">Bus</span> : 8</p>
                    <p><span className="font-semibold">Filled</span> : 30/50</p>
                    <p><span className="font-semibold">Date</span> : 10 December 2024</p>
                </div>
                <div className="flex flex-col mt-auto gap-y-2">
                    <button className="py-2 px-6 text-xs duration-300 rounded-md bg-gradient-end text-white w-fit cursor-pointer hover:bg-gradient-end/70">Presence</button>
                    <button onClick={() => router.push(`/shcedule/${id}`)} className="py-2 px-6 text-xs duration-300 rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-500 w-full">Cancel</button>
                </div>
            </div>
        </div>
    )
}