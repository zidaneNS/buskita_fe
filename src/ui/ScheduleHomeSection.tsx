import ScheduleCardHome from "@/components/ScheduleCardHome";
import { Schedule } from "@/lib/type";
import { use } from "react";

export default function ScheduleHomeSection({ schedules }: { schedules: Promise<Schedule[] | null>}) {
    const allSchedules = use(schedules);

    return (
        <div className="w-full min-h-full grid grid-rows-3 grid-cols-3 gap-y-6 gap-x-8">
            { allSchedules ? 
                allSchedules.map((schedule, i) => (
                    <ScheduleCardHome key={i} schedule={schedule} />
                ))
            : (
                <div>Schedule empty</div>
            )}
        </div>
    )
}