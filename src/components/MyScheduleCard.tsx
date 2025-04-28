'use client';

import { Schedule, Seat, User } from "@/lib/type";
import { add, format } from "date-fns";
import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";
import Modal from "./Modal";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export default function MyScheduleCard({ schedule, user, seats }: { schedule: Schedule, user: User, seats: Seat[] }) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const filledSeats = seats.filter(seat => seat.user_id !== null);
    const seat = seats.filter(seat => seat.user_id === user.id)[0];

    const time = format(new Date(schedule.time), "HH:mm");
    const timeEnd = add(new Date(schedule.time), { hours: 1 });
    const timeEndStr = format(new Date(timeEnd), "HH:mm");

    const date = format(new Date(schedule.time), "dd MMMM yyyy");
    return (
        <>
            {isOpenModal && (
                <Modal>
                    <div className="flex flex-col w-full items-center">
                        <div className="flex flex-col gap-y-4 items-center bg-white py-4 px-6 rounded-lg text-black shadow-xl">
                            <IoWarningOutline className="size-16 p-3 rounded-full bg-red-200/40 text-red-500" />
                            <h1 className="font-bold text-xl">Cancel Schedule</h1>
                            <div className="w-fit gap-y-2 text-slate-700">
                                <p>Are you sure want to cancel this schedule ?</p>
                                <p><span className="font-semibold">Time</span> : {time} - {timeEndStr}</p>
                                <p><span className="font-semibold">Bus</span> : {schedule.bus_identity}</p>
                                <p><span className="font-semibold">Date</span> : {date}</p>
                                <p><span className="font-semibold">Seat</span> : {seat.seat_number}</p>
                                <p><span className="font-semibold">Filled</span> : {filledSeats.length}/{seats.length}</p>
                            </div>
                            <button className="w-full py-2 text-center rounded-md bg-red-500 text-white font-semibold cursor-pointer hover:bg-red-300 duration-300">Delete</button>
                            <button onClick={() => setIsOpenModal(false)} className="w-full py-2 text-center rounded-md border border-slate-600 text-slate-600 font-semibold cursor-pointer hover:bg-slate-800 hover:text-white duration-300">Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="bg-white shadow-xl text-black flex flex-col gap-y-6 px-6 py-4 rounded-xl hover:-translate-y-3 duration-300">
                <div className="flex justify-between items-center pb-2 border-b-2 border-dashed border-black">
                    <div className="flex gap-x-2 items-center">
                        <FaBusAlt className="size-5" />
                        <p className="text-xl font-bold">{schedule.route_name}</p> 
                    </div>
                    <p className="text-xs italic bg-red-200 p-2 rounded-md text-red-800">{seat.verified ? "verified" : "unverified"}</p>
                    <p className="text-lg font-semibold">{time} - {timeEndStr}</p>
                </div>
                <div className="flex justify-between mt-auto items-center">
                    <div className="flex flex-col w-full mt-auto">
                        <p><span className="font-semibold">Bus</span> : {schedule.bus_identity}</p>
                        <p><span className="font-semibold">Date</span> : {date}</p>
                    </div>
                    <div className="flex flex-col w-full mt-auto">
                        <p><span className="font-semibold">Seat</span> : {seat.seat_number}</p>
                        <p><span className="font-semibold">Filled</span> : {filledSeats.length}/{seats.length}</p>
                    </div>
                    <div className="flex flex-col mt-auto gap-y-2">
                        <Link href={`/schedule/${schedule.id}`} className="w-full py-2 px-6 text-xs duration-300 rounded-md bg-gradient-end text-white cursor-pointer text-center hover:bg-gradient-end/70">View</Link>
                        <button onClick={() => setIsOpenModal(true)} className="w-full py-2 px-6 text-xs duration-300 rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-400">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}