import Image from "next/image";
import Link from "next/link";

export default function ScheduleCardHome({ id }: { id: number | string }) {
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
                    <p className="text-xl font-semibold">SBY - GSK</p> 
                </div>
                <p className="text-sm font-semibold">06:00 - 07:00</p>
            </div>
            <div className="flex justify-between mt-auto">
                <div className="flex flex-col w-full text-xs">
                    <p><span className="font-semibold">Bus</span> : 8</p>
                    <p><span className="font-semibold">Filled</span> : 30/50</p>
                    <p><span className="font-semibold">Date</span> : 10 December 2024</p>
                </div>
                <Link href={`/schedule/${id}`} className="py-2 px-6 text-sm duration-300 rounded-md bg-gradient-end text-white w-fit cursor-pointer hover:bg-gradient-end/70 mt-auto">Join</Link>
            </div>
        </div>
    )
}