import { DefaultModel } from "./model";

export interface Role extends DefaultModel {
  roleId: number;
  name: string;
}

export interface User extends DefaultModel {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  roleId: number;
  creditScore: number;
  role?: Role;
}