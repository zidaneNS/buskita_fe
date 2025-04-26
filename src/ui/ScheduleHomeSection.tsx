import ScheduleCardHome from "@/components/ScheduleCardHome";
import { Schedule } from "@/lib/type";
import { use } from "react";

export default function ScheduleHomeSection({ schedules, userSchedules }: { schedules: Promise<Schedule[] | null>, userSchedules: Promise<Schedule[] | null> }) {
    const allSchedules = use(schedules) || [];
    const allUserSchedules = use(userSchedules) || [];

    const filteredSchedules = allSchedules.filter(schedule => !allUserSchedules.includes(schedule));

    return (
        <div className="w-full min-h-full grid grid-rows-3 grid-cols-3 gap-y-6 gap-x-8">
            { filteredSchedules ? 
                filteredSchedules.map((schedule, i) => (
                    <ScheduleCardHome key={i} schedule={schedule} />
                ))
            : (
                <div>Schedule empty</div>
            )}
        </div>
    )
}