import { DataStatus } from "../../shared";
import { ApiResponse } from "../../../utility/callApi";

import { Quest } from "../quests";
import { Cutscene } from "../cutscenes";


export interface ContentPack extends ApiResponse {
  id: string,
  name: string,
  description?: string

  stages?: ContentStage[]
}
interface ContentStage {
  quests?: Quest[],
  scenes?: Cutscene[]
}
// interface StageCompleteTrigger {
//   trigger: Trigger,
//   interval?: number,
//   byDay?: DayOfWeek[]
//   byMonthDay?: number,
//   byWeekOfMonth?: number
// }
// enum Trigger {
//   None = "NONE", // Not Implemented Stub
//   Any = "ANY", // Represents quests that can appear at any time (no schedule filter)
// }

export enum ContentActions {
  FETCH_REQUEST = "@@content/FETCH_REQUEST",
  FETCH_SUCCESS = "@@content/FETCH_SUCCESS",
  FETCH_ERROR = "@@content/FETCH_ERROR",

  CREATE_REQUEST = "@@content/CREATE_REQUEST",
  CREATE_SUCCESS = "@@content/CREATE_SUCCESS",
  CREATE_ERROR = "@@content/CREATE_ERROR",

  UPDATE_REQUEST = "@@content/UPDATE_REQUEST",
  UPDATE_SUCCESS = "@@content/UPDATE_SUCCESS",
  UPDATE_ERROR = "@@content/UPDATE_ERROR",

  DELETE_REQUEST = "@@content/DELETE_REQUEST",
  DELETE_SUCCESS = "@@content/DELETE_SUCCESS",
  DELETE_ERROR = "@@content/DELETE_ERROR"
}

export interface ContentState {
  readonly data: ContentPack[]
  readonly status: DataStatus,
  readonly errors?: string
}
