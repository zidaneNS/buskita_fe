import DropDown from "@/components/DropDown";
import MyScheduleCard from "@/components/MyScheduleCard";
import { dummyDates, dummyRoutes } from "@/lib/dummyData"

export default function Page() {
    const routes = dummyRoutes;
    const dates = dummyDates;
    return (
        <main className="flex flex-col gap-y-4 px-32 pt-32 pb-10 w-full min-h-screen">
            <h1 className="w-full text-3xl font-semibold py-6 border-b border-white">My Schedule</h1>
            <section className="w-full flex flex-col gap-y-4">
                <p className="font-semibold">Filter</p>
                <div className="w-1/3 flex justify-center gap-x-8">
                    <DropDown items={routes} />
                    <DropDown items={dates} />
                </div>
                <div className="h-[90vh] w-full overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gradient-end/70 scrollbar-thumb-midnight-purple pt-4">
                    <div className="min-h-full gap-x-2 gap-y-4 grid grid-cols-3 grid-rows-3 w-full">
                        {Array.from({ length: 12 }).map((_,i) => (
                            <MyScheduleCard key={i} id={i} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}