import { UUID } from "crypto";
import {
  AlertTypeEnum,
  MonitoringValuesEnum,
  UserRoleEnum,
  UserSubRoleEnum,
} from "./enums";

interface Model {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Auth extends Model {
  email: string;
  password: string;
}

export interface User extends Model {
  fullName: string;
  email: string;
  role: UserRoleEnum;
  subRole: UserSubRoleEnum;
  Branches: Branch[];
  AuthId: UUID;
  Auth: Auth;
}

export interface Branch extends Model {
  name: string;
  maxCapacity: number;
  opening: string;
  closing: string;
  timeZone: string;
  Users: User[];
}

export interface Message extends Model {
  text: string;
  timestamp: string;
  sender: string;
  isYou: boolean;
  UserId: UUID;
  BranchId: UUID;
}
export interface Concurrence extends Model {
  BranchId: UUID;
  date: string;
  type: "entry" | "exit";
  hourIntervalStart: number;
  entries: number;
  exits: number;
}

export interface Alert extends Model {
  BranchId: UUID;
  sender: string;
  timestamp: string;

  type: AlertTypeEnum;
}

export interface Monitoring extends Model {
  branchId: number;
  date: string;
  peopleInBars: MonitoringValuesEnum;
  peopleInDance: MonitoringValuesEnum;
  hourIntervalStart: number;
  BranchId: UUID;
}
