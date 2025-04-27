import { Schedule, User } from "@/lib/type";
import MyScheduleCard from "./MyScheduleCard";
import { use } from "react";
import { getSeatsBySchedule } from "@/lib/action";

export default function MyScheduleCardWrapper({ schedule, user }: { schedule: Schedule, user: User }) {
    const seats = use(getSeatsBySchedule(schedule.id)) || [];
    return (
        <MyScheduleCard schedule={schedule} user={user} seats={seats} />
    )
}