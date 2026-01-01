import ScheduleCardHome from "@/components/ScheduleCardHome";
import { ScheduleCard, User } from "@/lib/type";

export interface ScheduleHomeSectionProps {
  schedules: ScheduleCard[];
  user: User;
}

export default function ScheduleHomeSection({
  schedules,
  user
}: ScheduleHomeSectionProps) {
  const filteredSchedules = schedules.filter(schedule => !schedule.users?.some(us => us.userId === user.userId));
  return (
    <div className="w-full max-h-full grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
      {filteredSchedules ?
        filteredSchedules.map((schedule, i) => (
          <ScheduleCardHome key={i} schedule={schedule} />
        ))
        : (
          <div>Schedule empty</div>
        )}
    </div>
  )
}