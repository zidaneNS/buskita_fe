import { Schedule, Seat, User } from "@/lib/type";
import { add, format } from "date-fns";
import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";

export default function MyScheduleCard({ schedule, user, seats }: { schedule: Schedule, user: User, seats: Seat[] }) {
    const filledSeats = seats.filter(seat => seat.user_id !== null);
    const seat = seats.filter(seat => seat.user_id === user.id)[0];

    const time = format(new Date(schedule.time), "HH:mm");
    const timeEnd = add(new Date(schedule.time), { hours: 1 });
    const timeEndStr = format(new Date(timeEnd), "HH:mm");

    const date = format(new Date(schedule.time), "dd MMMM yyyy");
    return (
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
                    <button className="w-full py-2 px-6 text-xs duration-300 rounded-md bg-gradient-end text-white cursor-pointer hover:bg-gradient-end/70">View</button>
                    <Link href={`/schedule/${schedule.id}`} className="w-full py-2 px-6 text-xs duration-300 rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-500">Cancel</Link>
                </div>
            </div>
        </div>
    )
}