import ScheduleCardHome from "@/components/ScheduleCardHome";
import { ScheduleCard } from "@/lib/type/schedule";
import { use } from "react";

export default function ScheduleHomeSection({ schedules, userSchedules }: { schedules: Promise<ScheduleCard[] | null>, userSchedules: Promise<ScheduleCard[] | null> }) {
    const allSchedules = use(schedules) || [];
    const allUserSchedules = use(userSchedules) || [];

    const filteredSchedules = allSchedules.filter(schedule => 
        !allUserSchedules.some(userSchedule => userSchedule.scheduleId === schedule.scheduleId)
    );

    return (
        <div className="w-full max-h-full grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
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