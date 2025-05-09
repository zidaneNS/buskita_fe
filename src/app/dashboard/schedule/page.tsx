import { getAllBuses, getRoutes, getSchedules } from "@/lib/action";
import ScheduleHeadSection from "@/ui/ScheduleHeadSection";
import ScheduleListSection from "@/ui/ScheduleListSection";
import { Suspense } from "react";

export default async function Page() {
    const rawSchedules = getSchedules();
    const buses = await getAllBuses() || [];
    const routes = await getRoutes() || [];
    return (
        <main className="flex flex-col h-screen w-full gap-y-6 py-8 px-10">
            <ScheduleHeadSection buses={buses} routes={routes} />
            <Suspense fallback={<div>Loading...</div>}>
                <ScheduleListSection rawSchedules={rawSchedules} />
            </Suspense>
        </main>
    )
}