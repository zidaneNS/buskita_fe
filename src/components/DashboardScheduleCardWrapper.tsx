import { getSeatsBySchedule } from "@/lib/action";
import { Schedule } from "@/lib/type";
import { use } from "react";
import DashboardScheduleCard from "./DashboardScheduleCard";

export default function DashboardScheduleCardWrapper({
    schedule
}: {
    schedule: Schedule
}) {
    const seats = use(getSeatsBySchedule(schedule.id)) || [];

    return <DashboardScheduleCard schedule={schedule} seats={seats} />
}