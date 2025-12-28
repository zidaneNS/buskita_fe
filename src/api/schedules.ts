import { ScheduleCard } from "@/lib/type/schedule";
import { schedules } from "@/mockup/schedules";

export async function getSchedules() {
  return schedules;
}

export async function getUserSchedule(): Promise<ScheduleCard[]> {
  return [];
}