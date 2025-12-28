import { Bus } from "./bus";
import { DefaultModel } from "./model";

export interface Route extends DefaultModel {
  routeId: string;
  name: string;
}

export interface Schedule extends DefaultModel {
  scheduleId: string;
  time: Date;
  isClosed: false;
  busId: string;
  routeId: string;
  bus?: Bus;
  route?: Route;
}

export interface ScheduleCard extends Schedule {
  totalSeats: number;
  totalUser: number;
}