import { getScheduleById } from "@/lib/action";
import ScheduleDetailWrapper from "@/ui/ScheduleDetailWrapper";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    const rawSchedule = getScheduleById(id);
    return (
        <Suspense fallback={<div className="w-full text-center">Loading...</div>}>
            <ScheduleDetailWrapper rawSchedule={rawSchedule} />
        </Suspense>
    )
}