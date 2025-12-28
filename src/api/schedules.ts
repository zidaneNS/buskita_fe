import { Schedule } from "@/lib/type";
import { ScheduleCard } from "@/lib/type/schedule";
import { Seat } from "@/lib/type/seat";
import { schedules } from "@/mockup/schedules";
import { seats } from "@/mockup/seats";

export async function getSchedules() {
  return schedules;
}

export async function getUserSchedule(): Promise<ScheduleCard[]> {
  return [];
}

export async function getScheduleById(scheduleId: string): Promise<ScheduleCard | null> {
  return schedules.find(item => item.scheduleId === scheduleId) || null;
}

export async function getSeatsBySchedule(scheduleId: string): Promise<Seat[] | null> {
  return seats.filter(item => item.scheduleId === scheduleId);
}