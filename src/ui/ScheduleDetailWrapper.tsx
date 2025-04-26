import { getBusBySchedule } from "@/lib/action";
import { Schedule } from "@/lib/type";
import { notFound } from "next/navigation";
import { use } from "react";
import ScheduleDetailPage from "./ScheduleDetailPage";

export default function ScheduleDetailWrapper({ rawSchedule }: { rawSchedule: Promise<Schedule | null>}) {
    const schedule = use(rawSchedule);
    if (!schedule) notFound();

    const rawBus = getBusBySchedule(schedule.id);
    const bus = use(rawBus)!;

    return (
        <ScheduleDetailPage bus={bus} schedule={schedule} />
    )
}