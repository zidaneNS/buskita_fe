import MyScheduleCard from "./MyScheduleCard";
import { use } from "react";
import { ScheduleCard } from "@/lib/type/schedule";
import { User } from "@/lib/type/user";
import { getSeatsBySchedule } from "@/lib/action";
import { EncryptedSchedule } from "@/lib/type";

export default function MyScheduleCardWrapper({ schedule, user }: { schedule: EncryptedSchedule, user: User }) {
    const seats = use(getSeatsBySchedule(schedule.scheduleId)) || [];
    return (
        <MyScheduleCard schedule={schedule} user={user} seats={seats} />
    )
}