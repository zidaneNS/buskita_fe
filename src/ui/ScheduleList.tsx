import DashboardScheduleCardWrapper from "@/components/DashboardScheduleCardWrapper";
import { Schedule } from "@/lib/type";

export default function ScheduleList({ schedules }: { schedules: Schedule[] }) {
    return (
        <div className="w-full grid grid-cols-3 gap-3">
            {schedules.map((schedule, i) => (
                <DashboardScheduleCardWrapper key={i} schedule={schedule} />
            ))}
        </div>
    )
}