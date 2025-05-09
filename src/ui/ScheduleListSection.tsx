import { Schedule } from "@/lib/type";
import { use } from "react";
import ScheduleList from "./ScheduleList";

export default function ScheduleListSection({ rawSchedules }: { rawSchedules: Promise<Schedule[] | null> }) {
    const schedules = use(rawSchedules) || [];
    return (
        <section className="max-h-full pr-4 py-4 overflow-y-auto scrollbar-thin w-full">
            <ScheduleList schedules={schedules} />
        </section>
    )
}