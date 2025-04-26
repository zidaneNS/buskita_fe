'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SeatSection from "./SeatSection";
import Image from "next/image";
import { useState } from "react";
import { Bus, Schedule } from "@/lib/type";

export default function ScheduleDetailPage({ schedule, bus }: { schedule: Schedule, bus: Bus }) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(0);

    return !isSuccess ?
        (
            <main className="min-h-screen flex flex-col w-full p-32 gap-y-4">
                <Link href="/schedule" className="w-fit flex gap-x-3 items-center">
                    <ArrowLeftIcon className="size-6" />
                    <p className="hover:underline">Back to all offers</p>
                </Link>
                <section className="w-full flex gap-x-18">
                    <div className="w-1/2 flex flex-col py-10 px-12 gap-y-16 bg-gradient-end rounded-lg shadow-2xl">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-xl font-semibold">Pick your seat</h1>
                            <p>Bus : {bus.identity}</p>
                        </div>
                        <SeatSection selected={selected} setSelected={setSelected} />
                        <div className="w-full px-4 flex justify-around">
                            <div className="w-fit flex flex-col gap-y-2 items-center">
                                <span className="size-10 bg-white rounded-md"></span>
                                <p className="text-xs">Available</p>
                            </div>
                            <div className="w-fit flex flex-col gap-y-2 items-center">
                                <span className="size-10 bg-lime-400 rounded-md"></span>
                                <p className="text-xs">Selected</p>
                            </div>
                            <div className="w-fit flex flex-col gap-y-2 items-center">
                                <span className="size-10 bg-teal-500 rounded-md"></span>
                                <p className="text-xs">Booked</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col h-fit items-center gap-y-6">
                        <div className="flex flex-col w-full gap-y-4 pt-8 pb-12 px-10 bg-gradient-end rounded-lg shadow-xl">
                            <h1 className="font-semibold text-lg px-4">Booking Summary</h1>
                            <span className="w-full border-b border-white"></span>
                            <div className="flex gap-x-2 w-fit items-center">
                                <Image
                                    src="/assets/route-booking.png"
                                    alt="route"
                                    width={40}
                                    height={44}
                                />
                                <div className="flex flex-col text-lg">
                                    <p>Route</p>
                                    <p className="font-bold">{schedule.route_name}</p>
                                </div>
                            </div>
                            <p>Name : Muhammad Zidane Nur Syabani</p>
                            <p>Seat : {selected}</p>
                            <p>Date : 10 December 2025</p>
                        </div>
                        <button onClick={() => setIsSuccess(true)} className="bg-midnight-purple rounded-xl py-2 px-8 font-semibold text-xl cursor-pointer hover:bg-white/20 duration-300">Book</button>
                    </div>
                </section>
            </main>
        ) : (
            <main className="h-screen w-full flex items-center justify-center flex-col gap-y-4">
                <h1 className="text-3xl font-semibold">Your Booking is Succeed</h1>
                <p className="text-sm">Click this button to back on homepage</p>
                <Link href="/schedule" className="py-2 px-6 bg-midnight-purple rounded-xl hover:bg-white/40 duration-300 cursor-pointer">Back</Link>
            </main>
        )
}