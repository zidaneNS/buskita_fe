import MyScheduleCardWrapper from "@/components/MyScheduleCardWrapper";
import { EncryptedSchedule } from "@/lib/type";
import { ScheduleCard } from "@/lib/type/schedule";
import { User } from "@/lib/type/user";

export default function MyScheduleSection({ schedules, user }: { schedules: EncryptedSchedule[], user: User }) {
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