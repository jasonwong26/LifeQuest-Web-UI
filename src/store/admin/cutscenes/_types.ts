import { DataStatus } from "../../shared";
import { ApiResponse } from "../../../utility/callApi";

export interface Cutscene extends ApiResponse {
  id: string
  name: string,
  category: CutsceneCategory,
  description: string
  dialogue: Dialogue[],
  trigger: Trigger
}
export interface Dialogue {
  characterId: string,
  imageUrl: string,
  position: Position,
  speaker: string,
  text: string[]
}
export enum Position {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}

export interface Trigger {
  type: TriggerType
  level?: number
  quests?: number
}

export enum CutsceneCategory {
  DEMO = "Demo",
  TUTORIAL = "Tutorial",
  NORMAL = "Normal"
}

export enum TriggerType {
  NONE = "NONE",                               // Not implmemented stub
  DEMO_START = "DEMO_START",                   // on Demo start
  DEMO_END = "DEMO_END",                       // on Demo end
  QUESTS_COMPLETED = "QUESTS_COMPLETED",       // # of quests completed
  LEVEL_REACHED = "LEVEL_REACHED"              // X Level attained
}

export enum CutscenesActions {
  FETCH_REQUEST = "@@cutscenes/FETCH_REQUEST",
  FETCH_SUCCESS = "@@cutscenes/FETCH_SUCCESS",
  FETCH_ERROR = "@@cutscenes/FETCH_ERROR",

  CREATE_REQUEST = "@@cutscenes/CREATE_REQUEST",
  CREATE_SUCCESS = "@@cutscenes/CREATE_SUCCESS",
  CREATE_ERROR = "@@cutscenes/CREATE_ERROR",

  UPDATE_REQUEST = "@@cutscenes/UPDATE_REQUEST",
  UPDATE_SUCCESS = "@@cutscenes/UPDATE_SUCCESS",
  UPDATE_ERROR = "@@cutscenes/UPDATE_ERROR",

  DELETE_REQUEST = "@@cutscenes/DELETE_REQUEST",
  DELETE_SUCCESS = "@@cutscenes/DELETE_SUCCESS",
  DELETE_ERROR = "@@cutscenes/DELETE_ERROR"
}

export interface CutscenesState {
  readonly data: Cutscene[]
  readonly status: DataStatus,
  readonly errors?: string
}
