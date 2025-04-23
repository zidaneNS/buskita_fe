'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyScheduleCard({ id }: { id: number | string }) {
    const router = useRouter();
    return (
        <div className="bg-white shadow-xl text-black flex flex-col gap-y-6 px-6 py-4 rounded-xl hover:-translate-y-3 duration-300">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-1 items-center">
                    <Image
                        alt="bus"
                        src="/assets/bus-card.png"
                        width={19}
                        height={19}
                    />
                    <p className="text-xl font-semibold">SBY - GSK</p> 
                </div>
                <p className="text-sm font-semibold">06:00 - 07:00</p>
            </div>
            <div className="flex justify-between mt-auto items-center">
                <div className="flex flex-col w-full text-xs">
                    <p><span className="font-semibold">Bus</span> : 8</p>
                    <p><span className="font-semibold">Filled</span> : 30/50</p>
                    <p><span className="font-semibold">Date</span> : 10 December 2024</p>
                </div>
                <div className="flex flex-col mt-auto gap-y-4">
                    <button className="py-2 px-6 text-xs duration-300 rounded-md bg-gradient-end text-white w-fit cursor-pointer hover:bg-gradient-end/70">More</button>
                    <button onClick={() => router.push(`/shcedule/${id}`)} className="py-2 px-6 text-xs duration-300 rounded-md bg-gradient-end text-white cursor-pointer hover:bg-gradient-end/70 w-full">Join</button>
                </div>
            </div>
        </div>
    )
}