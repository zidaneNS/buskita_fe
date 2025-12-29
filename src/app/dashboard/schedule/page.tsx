import { getAllBuses, getRoutes, getSchedules } from "@/lib/action";
import { schedules } from "@/mockup/schedules";
import ScheduleHeadSection from "@/ui/ScheduleHeadSection";
import ScheduleList from "@/ui/ScheduleList";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }>}) {
    const buses = await getAllBuses() || [];
    const routes = await getRoutes() || [];

    const { search } = await searchParams;

    const rawSchedules = schedules;
    const finalSchedules = search ? rawSchedules.filter(schedule => schedule.bus?.name.toLowerCase().includes(search.toLowerCase()) ||
    schedule.route?.name.toLowerCase().includes(search.toLowerCase()) ||
    schedule.time.toString().toLowerCase().includes(search.toLowerCase())) : rawSchedules;
    return (
        <main className="flex flex-col h-screen w-full gap-y-6 px-8 py-6 md:py-8 md:px-10">
            <ScheduleHeadSection buses={buses} routes={routes} />
            <section className="max-h-full pr-4 py-4 overflow-y-auto scrollbar-thin w-full">
                <ScheduleList schedules={finalSchedules} />
            </section>
        </main>
    )
}