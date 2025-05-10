import { getAllBuses, getRoutes, getSeatsBySchedule } from "@/lib/action";
import { Schedule } from "@/lib/type";
import DashboardScheduleCard from "./DashboardScheduleCard";

export default async function DashboardScheduleCardWrapper({
    schedule
}: {
    schedule: Schedule
}) {
    const seats = await getSeatsBySchedule(schedule.id) || [];
    const routes = await getRoutes() || [];
    const buses = await getAllBuses() || [];

    return <DashboardScheduleCard schedule={schedule} seats={seats} routes={routes} buses={buses} />
}