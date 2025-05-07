import { Bus } from "@/lib/type";
import { FaBusAlt } from "react-icons/fa";

export default function BusCard({ bus }: { bus: Bus }) {
    const identity = bus.identity.padStart(2, '0');
    const capacity = bus.available_row * bus.available_col + bus.available_backseat;
    return (
        <div className="flex items-center px-6 py-4 rounded-lg bg-black/40 border border-dark-purple gap-x-3 cursor-pointer hover:-translate-y-3 duration-300">
            <FaBusAlt className="size-20 text-midnight-purple" />
            <div className="flex flex-col gap-y-2 w-full">
                <h2 className="text-base :text-lg font-bold">Bus identity: {identity}</h2>
                <p className="font-thin">Capacity: {capacity}</p>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
                <button className="text-xs px-4 py-2 rounded-full bg-midnight-purple cursor-pointer hover:bg-midnight-purple/70 duration-300 w-fit">More</button>
                <button className="text-xs px-4 py-2 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 duration-300 w-fit">Delete</button>
            </div>
        </div>
    )
}