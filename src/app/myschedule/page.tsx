import DropDown from "@/components/DropDown";
import { getUserSchedule } from "@/lib/action";
import { getUser } from "@/lib/dal";
import { dummyDates, dummyRoutes } from "@/lib/dummyData"
import MyScheduleSection from "@/ui/MyScheduleSection";
import { Suspense } from "react";

export default async function Page() {
    const routes = dummyRoutes;
    const dates = dummyDates;

    const rawSchedules = getUserSchedule();
    const user = await getUser();
    return (
        <main className="flex flex-col gap-y-4 px-6 md:px-32 pt-24 md:pt-32 pb-10 w-full min-h-screen">
            <h1 className="w-full text-xl md:text-3xl font-semibold py-4 md:py-6 border-b border-white">My Schedule</h1>
            <section className="w-full flex flex-col gap-y-4">
                <p className="text-sm md:text-base font-semibold">Filter</p>
                <div className="w-full md:w-1/3 flex justify-center gap-x-8">
                    <DropDown items={routes} />
                    <DropDown items={dates} />
                </div>
                <div className="h-[90vh] w-full overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gradient-end/70 scrollbar-thumb-midnight-purple pt-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <MyScheduleSection rawSchedules={rawSchedules} user={user!} />
                    </Suspense>
                </div>
            </section>
        </main>
    )
}