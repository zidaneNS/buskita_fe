import { getSchedules } from "@/lib/action";
import { Bus } from "@/lib/type/bus";
import { buses } from "@/mockup/buses";
import { schedules } from "@/mockup/schedules";

export async function getBusBySchedule(scheduleId: string): Promise<Bus | null> {
  const foundSchedule = schedules.find(item => item.scheduleId === scheduleId);
  if (!foundSchedule) return null;

  const foundBus = buses.find(item => item.busId === foundSchedule.busId);
  if (!foundBus) return null;

  return foundBus;
}