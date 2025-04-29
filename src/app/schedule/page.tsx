import DropDown from "@/components/DropDown";
import { getSchedules, getUserSchedule } from "@/lib/action";
import { dummyDates, dummyRoutes } from "@/lib/dummyData";
import ScheduleHomeSection from "@/ui/ScheduleHomeSection";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

export default function Page() {
    const routes = dummyRoutes;
    const dates = dummyDates;

    const schedules = getSchedules();
    const userSchedules = getUserSchedule();
    return (
        <main className="flex flex-col gap-y-6 px-6 md:px-32 pt-24 md:pt-32 pb-10 w-full min-h-screen">
            <section className="flex flex-col gap-y-6 w-full">
                <h1 className="text-xl md:text-3xl font-bold">Bus & Shuttle Schedule</h1>
                <div className="w-full shadow-xl bg-white rounded-xl py-2 px-4 md:py-6 md:px-10 text-black flex flex-col gap-y-3">
                    <div className="border-b border-black w-full flex flex-col pb-2">
                        <p className="text-sm md:text-base">Your Credits</p>
                        <p className="text-base md:text-lg font-semibold">15 Credits</p>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="w-full md:justify-between flex flex-col md:flex-row gap-y-3 text-white">
                            <div className="w-full md:w-1/3 flex justify-between gap-x-4">
                                <div className="w-full flex flex-col gap-y-2">
                                    <p className="text-sm font-semibold text-black">From - To</p>
                                    <DropDown items={routes} />
                                </div>
                                <div className="w-full flex flex-col gap-y-2">
                                    <p className="text-sm font-semibold text-black">Departure Date</p>
                                    <DropDown items={dates} />
                                </div>
                            </div>
                            <div className="flex w-full md:w-1/4 p-2 rounded-lg bg-gradient-end mt-auto">
                                <div className="flex gap-x-2 items-center w-full bg-dark-purple p-1 rounded-lg">
                                    <MagnifyingGlassIcon className="size-4" />  
                                    <input type="text" className="w-full text-sm outline-none" placeholder="Search..." />                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-y-2 md:gap-y-6 w-full h-[80vh]">
                <h1 className="text-xl md:text-3xl font-bold">Results</h1>
                <div className="h-full overflow-y-auto pr-6 py-4 scrollbar-thin scrollbar-track-gradient-end/70 scrollbar-thumb-midnight-purple">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ScheduleHomeSection userSchedules={userSchedules} schedules={schedules} />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}