'use client';

import { Bus, RouteType, Schedule, Seat } from "@/lib/type";
import { format } from "date-fns";
import { useState } from "react";
import { CiLock, CiRoute, CiUser } from "react-icons/ci";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { TbBus } from "react-icons/tb";
import Modal from "./Modal";
import ScheduleDetails from "./ScheduleDetails";
import EditScheduleForm from "./EditScheduleForm";

export default function DashboardScheduleCard({ 
    schedule, 
    seats,
    routes,
    buses
}: { 
    schedule: Schedule, 
    seats: Seat[],
    routes: RouteType[],
    buses: Bus[]
}) {
    const filledSeats = seats.filter(seat => seat.user_name !== null);
    console.log(seats);

    const date = format(schedule.time, "dd MMMM yyyy");
    const time = format(schedule.time, "HH:mm");
    const identity = schedule.bus_identity.padStart(2, '0');

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    return (
        <>
            {isOpen && (
                <Modal>
                    <ScheduleDetails 
                        setIsOpen={setIsOpen}
                        time={time}
                        identity={identity}
                        schedule={schedule}
                        filledSeats={filledSeats}
                        seats={seats}
                    />
                </Modal>
            )}
            {isEditing && (
                <Modal>
                    <div className="flex flex-col gap-y-4 px-6 py-4 rounded-md bg-dark-purple shadow-xl max-h-4/5 overflow-y-auto w-1/4">
                        <EditScheduleForm
                            routes={routes}
                            buses={buses}
                        />
                        <button onClick={() => setIsEditing(false)} className="py-2 w-full rounded-md border border-gray-400 cursor-pointer hover:bg-gray-400 duration-300">Cancel</button>
                    </div>
                </Modal>
            )}
            <div onClick={() => setIsOpen(true)} className={`flex flex-col gap-y-6 w-full px-6 py-4 rounded-lg shadow-xl cursor-pointer hover:-translate-y-3 bg-black/40 border ${schedule.closed ? "border-red-500": "border-dark-purple"} hover:bg-black/30 duration-300`}>
                <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex gap-x-6 items-center w-full">
                        <p className="text-2xl font-bold">{time}</p>
                        {schedule.closed && (
                            <div className="flex gap-x-1 w-fit items-center py-1 px-4 rounded-full bg-red-500">
                                <CiLock className="size-5" />
                                <p className="text-sm">Closed</p>
                            </div>
                        )}
                    </div>
                    <p className="text-xs">{date}</p>
                    <div className="flex gap-x-3 items-center">
                        <CiRoute className="size-8" />
                        <p className="font-semibold">{schedule.route_name}</p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <TbBus className="size-8" />
                        <p className="font-semibold">Bus: {identity}</p>
                    </div>
                    <div className="flex gap-x-3 items-center">
                        <CiUser className="size-8" />
                        <p className="font-semibold">Passengers: {filledSeats.length}/{seats.length}</p>
                    </div>
                </div>
                <div className="w-full flex flex-row-reverse gap-x-8">
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }} className="flex justify-center items-center p-2 rounded-md hover:bg-white/15 cursor-pointer duration-300">
                        <FaEdit className="size-6" />
                    </button>
                    <button className="flex justify-center items-center p-2 rounded-md hover:bg-white/15 cursor-pointer duration-300">
                        <FaRegTrashAlt className="size-6 text-red-500" />
                    </button>
                </div>
            </div>
        </>
    )
}