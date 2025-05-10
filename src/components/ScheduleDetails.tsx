import { CiClock1 } from "react-icons/ci";
import { FaRegUser, FaLock, FaLockOpen } from "react-icons/fa";
import { LuRoute } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { TbBus } from "react-icons/tb";
import FilledSeatList from "./FIlledSeatList";
import { Dispatch, SetStateAction } from "react";
import { Schedule, Seat } from "@/lib/type";

export default function ScheduleDetails({
    setIsOpen,
    time,
    identity,
    schedule,
    filledSeats,
    seats
}: {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    time: string,
    identity: string,
    schedule: Schedule,
    filledSeats: Seat[],
    seats: Seat[]
}) {
    return (
        <div className="bg-dark-purple px-6 py-4 rounded-md w-3/5 max-h-4/5 flex flex-col gap-y-6 border border-midnight-purple shadow-xl overflow-y-auto scrollbar-thin">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-2xl font-semibold">Schedule Details</h1>
                <button onClick={() => setIsOpen(false)} className="flex justify-center items-center p-1 rounded-xl border-3 border-purple-300 cursor-pointer hover:bg-white/15 duration-300">
                    <MdClose className="size-5" />
                </button>
            </div>
            <div className="w-full grid grid-cols-2 gap-y-6">
                <div className="flex items-center gap-x-4">
                    <CiClock1 className="text-purple-300 size-6" />
                    <p>{time}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <TbBus className="text-purple-300 size-6" />
                    <p>Bus: {identity}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <LuRoute className="text-purple-300 size-6"/>
                    <p>{schedule.route_name}</p>
                </div>
                <div className="flex items-center gap-x-4">
                    <FaRegUser className="text-purple-300 size-6"/>
                    <p>{filledSeats.length}/{seats.length} Passengers</p>
                </div>
                <div className="flex items-center gap-x-4">
                    {schedule.closed ? (
                        <FaLock className="text-purple-300 size-6"/>
                    ) : (
                        <FaLockOpen className="text-purple-300 size-6"/>
                    )}
                    <p>{schedule.closed ? "Closed" : "Open"}</p>
                </div>
            </div>
            <FilledSeatList seats={filledSeats} />
        </div>
    )
}