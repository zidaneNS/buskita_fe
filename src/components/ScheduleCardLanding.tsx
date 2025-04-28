import Image from "next/image";

export default function ScheduleCardLanding() {
    return (
        <div className="bg-ungu-muda text-black flex flex-col gap-y-8 px-4 md:px-6 py-2 md:py-4 rounded-xl">
            <div className="flex justify-between items-center">
                <div className="flex gap-x-1 items-center">
                    <Image
                        alt="bus"
                        src="/assets/bus-card.png"
                        width={19}
                        height={19}
                    />
                    <p className="text-sm md:text-lg font-semibold">SBY - GSK</p> 
                </div>
                <p className="text-xs md:text-sm font-semibold">06:00 - 07:00</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col w-full gap-y-2 text-xs md:text-sm">
                    <p>Date     : 10 December 2024</p>
                    <p>Filled   : 30/50</p>
                </div>
                <button className="py-2 px-4 md:px-6 text-xs md:text-sm duration-300 rounded-md bg-gradient-end text-white w-fit cursor-pointer hover:bg-gradient-end/70">Join</button>
            </div>
        </div>
    )
}