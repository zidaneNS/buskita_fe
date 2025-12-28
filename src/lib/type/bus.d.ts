import { DefaultModel } from "./model";

export interface Bus extends DefaultModel {
  busId: string;
  name: string;
  totalRow: number;
  totalCol: number;
  totalBackseat: number;
}