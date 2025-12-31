import { notFound } from "next/navigation";
import { use } from "react";
import ScheduleDetailPage from "./ScheduleDetailPage";
import { User } from "@/lib/type";
import { ScheduleCard } from "@/lib/type";
import { Seat } from "@/lib/type";
import { getBusBySchedule } from "@/lib/action";

export default function ScheduleDetailWrapper({ rawSchedule, user, rawSeats }: { rawSchedule: Promise<ScheduleCard | null>, user: User, rawSeats: Promise<Seat [] | null> }) {
    const schedule = use(rawSchedule);
    if (!schedule) notFound();

    const rawBus = getBusBySchedule(schedule.scheduleId);
    const bus = use(rawBus)!;

    const seats = use(rawSeats)!;

    return (
        <ScheduleDetailPage bus={bus} schedule={schedule} user={user} seats={seats} />
    )
}