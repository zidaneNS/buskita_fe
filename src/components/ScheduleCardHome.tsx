
import { ScheduleCard } from "@/lib/type";
import { add, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function ScheduleCardHome({ schedule }: { schedule: ScheduleCard }) {

    const time = format(schedule.time, "HH:mm");
    const date = format(new Date(schedule.time), "dd MMMM yyyy");
    const timeEndDate = add(new Date(schedule.time), { hours: 1});
    const timeEnd = format(new Date(timeEndDate), "HH:mm");
    
    return (
        <div className="bg-white shadow-xl text-black flex flex-col gap-y-8 px-6 py-4 rounded-xl hover:-translate-y-3 duration-300">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-1 items-center">
                    <Image
                        alt="bus"
                        src="/assets/bus-card.png"
                        width={19}
                        height={19}
                    />
                    <p className="text-xl font-semibold">{schedule.route?.name}</p> 
                </div>
                
                <p className={`text-xs italic p-1 rounded-md ${schedule.isClosed ? "text-red-800 bg-red-200" : "text-green-800 bg-green-200"}`}>{schedule.isClosed ? "Closed" : "Open"}</p>
                <p className="text-sm font-semibold">{time} - {timeEnd}</p>
            </div>
            <div className="flex justify-between mt-auto">
                <div className="flex flex-col w-full text-xs">
                    <p><span className="font-semibold">Bus</span> : {schedule.bus?.name}</p>
                    <p><span className="font-semibold">Filled</span> : {schedule.totalSeats}/{schedule.totalUser}</p>
                    <p><span className="font-semibold">Date</span> : {date}</p>
                </div>
                <Link href={`/schedule/${schedule.scheduleId}`} className="py-2 px-6 text-sm duration-300 rounded-md bg-gradient-end text-white w-fit cursor-pointer hover:bg-gradient-end/70 mt-auto">Join</Link>
            </div>
        </div>
    )
}