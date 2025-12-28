// import { getAllBuses, getRoutes, getSeatsBySchedule } from "@/lib/action";
import DashboardScheduleCard from "./DashboardScheduleCard";
import { ScheduleCard } from "@/lib/type/schedule";
import { routes } from "@/mockup/routes";
import { buses } from "@/mockup/buses";
import { getSeatsBySchedule } from "@/api/schedules";

export default async function DashboardScheduleCardWrapper({
    schedule
}: {
    schedule: ScheduleCard
}) {
    const seats = await getSeatsBySchedule(schedule.scheduleId) || [];
    // const routes = await getRoutes() || [];
    // const buses = await getAllBuses() || [];

    return <DashboardScheduleCard schedule={schedule} seats={seats} routes={routes} buses={buses} />
}