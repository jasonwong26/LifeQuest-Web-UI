import { DataStatus } from "../../shared";
import { ApiResponse } from "../../../utility/callApi";

export interface Quest extends ApiResponse {
  id: string
  name:string,
  description?: string,

  instructions: string,
  flavorText?: string,
  experience: number,
  rewardPoints: number,

  recurrence: RecurrencePattern,
  categories?: string[]
}

export enum Frequency {
  None = "NONE", // Not Implemented Stub
  Any = "ANY", // Represents quests that can appear at any time (no schedule filter)
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Quarterly = "Quarterly"
}
export enum DayOfWeek {
  Monday = "MO",
  Tuesday = "TU",
  Wednesday = "WE",
  Thursday = "TH",
  Friday = "FR",
  Saturday = "SA",
  Sunday = "SU"
}

export interface RecurrencePattern {
  frequency: Frequency,
  interval?: number,
  byDay?: DayOfWeek[]
  byMonthDay?: number,
  byWeekOfMonth?: number
}

export enum QuestsActions {
  FETCH_REQUEST = "@@quests/FETCH_REQUEST",
  FETCH_SUCCESS = "@@quests/FETCH_SUCCESS",
  FETCH_ERROR = "@@quests/FETCH_ERROR",

  CREATE_REQUEST = "@@quests/CREATE_REQUEST",
  CREATE_SUCCESS = "@@quests/CREATE_SUCCESS",
  CREATE_ERROR = "@@quests/CREATE_ERROR",

  UPDATE_REQUEST = "@@quests/UPDATE_REQUEST",
  UPDATE_SUCCESS = "@@quests/UPDATE_SUCCESS",
  UPDATE_ERROR = "@@quests/UPDATE_ERROR",

  DELETE_REQUEST = "@@quests/DELETE_REQUEST",
  DELETE_SUCCESS = "@@quests/DELETE_SUCCESS",
  DELETE_ERROR = "@@quests/DELETE_ERROR"
}

export interface QuestsState {
  readonly data: Quest[]
  readonly status: DataStatus,
  readonly errors?: string
}
