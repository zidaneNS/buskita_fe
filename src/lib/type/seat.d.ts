import { Bus } from "./bus";
import { DefaultModel } from "./model";
import { Schedule } from "./schedule";
import { User } from "./user";

export interface Seat extends DefaultModel {
  seatId: string;
  busId: string;
  userId?: string;
  scheduleId: string;
  seatNumber: number;
  verified: boolean;
  bus?: Bus;
  user?: User;
  schedule?: Schedule
}