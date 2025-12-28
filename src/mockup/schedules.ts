import { Schedule, ScheduleCard } from "@/lib/type/schedule";
import { buses } from "./buses";
import { routes } from "./routes";

export const schedules: ScheduleCard[] = [
  {
    scheduleId: "8da1c38b-ba1f-4840-b599-2b0833c41a28",
    time: new Date("2025-12-31T07:30:00.000Z"),
    isClosed: false,
    busId: "84738b46-2067-41de-b328-ba5872115a52",
    routeId: "e6974402-6811-485f-9cd2-b9a7eb665aed",
    createdAt: new Date("2025-12-25T10:39:38.366Z"),
    updatedAt: new Date("2025-12-26T08:41:01.362Z"),
    bus: buses[0],
    totalSeats: 36,
    totalUser: 2,
    route: routes[0],
  },
  {
    scheduleId: "eec43661-56de-4fa2-81fe-f02b9007900c",
    time: new Date("2026-01-05T08:30:00.000Z"),
    isClosed: false,
    busId: "84738b46-2067-41de-b328-ba5872115a52",
    routeId: "e6974402-6811-485f-9cd2-b9a7eb665aed",
    createdAt: new Date("2025-12-27T12:01:13.929Z"),
    updatedAt: new Date("2025-12-27T12:01:13.929Z"),
    bus: buses[0],
    totalSeats: 36,
    totalUser: 2,
    route: routes[0],
  }
];