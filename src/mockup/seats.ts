import { Seat } from "@/lib/type/seat";
import { buses } from "./buses";
import { schedules } from "./schedules";

const totalSeats = buses[0].totalRow * buses[0].totalCol + buses[0].totalBackseat;

export const seats: Seat[] = Array.from({ length: totalSeats }).map((_, id) => ({
  seatId: 'test',
  busId: buses[0].busId,
  scheduleId: schedules[0].scheduleId,
  seatNumber: id + 1,
  verified: false
}))