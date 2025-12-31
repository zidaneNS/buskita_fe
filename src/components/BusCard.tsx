'use client';

import { Bus } from "@/lib/type";
import { Dispatch, SetStateAction } from "react";
import { FaBusAlt } from "react-icons/fa";

export default function BusCard({ 
    bus, 
    setIsDeleting, 
    setSelectedBus,
    setIsEditing
    } : { 
    bus: Bus, 
    setIsDeleting: Dispatch<SetStateAction<boolean>>, 
    setSelectedBus: Dispatch<SetStateAction<Bus>>,
    setIsEditing: Dispatch<SetStateAction<boolean>>
}) {
    const identity = bus.name.padStart(2, '0');
    const capacity = bus.totalRow * bus.totalCol + bus.totalBackseat;
    const handleDelete = () => {
        setIsDeleting(true);
        setSelectedBus(bus);
    }
    const handleEdit = () => {
        setIsEditing(true);
        setSelectedBus(bus);
    }
    return (
        <div className="flex items-center px-6 py-4 rounded-lg bg-black/40 border border-dark-purple gap-x-3 cursor-pointer hover:-translate-y-3 duration-300">
            <FaBusAlt className="size-20 text-midnight-purple" />
            <div className="flex flex-col gap-y-2 w-full">
                <h2 className="text-base :text-lg font-bold">Bus identity: {identity}</h2>
                <p className="font-thin">Capacity: {capacity}</p>
            </div>
            <div className="flex flex-col gap-y-2 items-center w-fit">
                <button onClick={handleEdit} className="text-xs px-4 py-2 rounded-md bg-midnight-purple cursor-pointer hover:bg-midnight-purple/70 duration-300 w-full">More</button>
                <button onClick={handleDelete} className="text-xs px-4 py-2 rounded-md bg-red-500 cursor-pointer hover:bg-red-400 duration-300 w-full">Delete</button>
            </div>
        </div>
    )
}