// import { getAllBuses, getRoutes, getSeatsBySchedule } from "@/lib/action";
import DashboardScheduleCard from "./DashboardScheduleCard";
import { ScheduleCard } from "@/lib/type";
import { getAllBuses, getRoutes, getSeatsBySchedule } from "@/lib/action";

export default async function DashboardScheduleCardWrapper({
    schedule
}: {
    schedule: ScheduleCard
}) {
    const seats = await getSeatsBySchedule(schedule.scheduleId) || [];
    const routes = await getRoutes() || [];
    const buses = await getAllBuses() || [];

    return <DashboardScheduleCard schedule={schedule} seats={seats} routes={routes} buses={buses} />
}