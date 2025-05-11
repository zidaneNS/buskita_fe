import DashboardScheduleCardWrapper from "@/components/DashboardScheduleCardWrapper";
import { Schedule } from "@/lib/type";
import { Suspense } from "react";

export default function ScheduleList({ schedules }: { schedules: Schedule[] }) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
            {schedules.map((schedule, i) => (
                <Suspense key={i} fallback={<div>Loading...</div>}>
                    <DashboardScheduleCardWrapper schedule={schedule} />
                </Suspense>
            ))}
        </div>
    )
}