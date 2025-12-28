import { getScheduleById, getSeatsBySchedule } from "@/api/schedules";
import { user } from "@/mockup/user";
import ScheduleDetailWrapper from "@/ui/ScheduleDetailWrapper";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    const rawSchedule = getScheduleById(id);
    const rawSeats = getSeatsBySchedule(id);
    // const user = await getUser();

    return (
        <Suspense fallback={<div className="w-full flex justify-center items-center min-h-screen">Loading...</div>}>
            <ScheduleDetailWrapper rawSchedule={rawSchedule} user={user} rawSeats={rawSeats} />
        </Suspense>
    )
}