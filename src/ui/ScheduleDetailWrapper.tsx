import { getBusBySchedule } from "@/lib/action";
import { Schedule, Seat, User } from "@/lib/type";
import { notFound } from "next/navigation";
import { use } from "react";
import ScheduleDetailPage from "./ScheduleDetailPage";

export default function ScheduleDetailWrapper({ rawSchedule, user, rawSeats }: { rawSchedule: Promise<Schedule | null>, user: User, rawSeats: Promise<Seat [] | null> }) {
    const schedule = use(rawSchedule);
    if (!schedule) notFound();

    const rawBus = getBusBySchedule(schedule.id);
    const bus = use(rawBus)!;

    const seats = use(rawSeats)!;

    return (
        <ScheduleDetailPage bus={bus} schedule={schedule} user={user} seats={seats} />
    )
}