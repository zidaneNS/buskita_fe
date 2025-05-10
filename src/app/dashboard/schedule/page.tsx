import { getAllBuses, getRoutes, getSchedules } from "@/lib/action";
import ScheduleHeadSection from "@/ui/ScheduleHeadSection";
import ScheduleList from "@/ui/ScheduleList";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }>}) {
    const buses = await getAllBuses() || [];
    const routes = await getRoutes() || [];

    const { search } = await searchParams;

    const rawSchedules = await getSchedules() || [];
    const schedules = search ? rawSchedules.filter(schedule => schedule.bus_identity.toLowerCase().includes(search.toLowerCase()) ||
    schedule.route_name.toLowerCase().includes(search.toLowerCase()) ||
    schedule.time.toString().toLowerCase().includes(search.toLowerCase())) : rawSchedules;
    return (
        <main className="flex flex-col h-screen w-full gap-y-6 py-8 px-10">
            <ScheduleHeadSection buses={buses} routes={routes} />
            <section className="max-h-full pr-4 py-4 overflow-y-auto scrollbar-thin w-full">
                <ScheduleList schedules={schedules} />
            </section>
        </main>
    )
}