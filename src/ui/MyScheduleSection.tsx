import MyScheduleCardWrapper from "@/components/MyScheduleCardWrapper";
import { Schedule, User } from "@/lib/type";
import { use } from "react";

export default function MyScheduleSection({ rawSchedules, user }: { rawSchedules: Promise<Schedule [] | null>, user: User }) {
    const schedules = use(rawSchedules) || [];
    return (
        <div className="max-h-full gap-y-4 grid grid-cols-1 w-full">
            {schedules.length > 0 ? 
                schedules.map((schedule,i) => (
                    <MyScheduleCardWrapper key={i} schedule={schedule} user={user} />
                )) : (
                    <div className="w-full text-center">Shcedule empty, pick your schedule</div>
                )
            }
        </div>
    )
}