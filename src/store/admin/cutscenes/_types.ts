import { DataStatus } from "../../shared";
import { ApiResponse } from "../../../utility/callApi";

export interface Cutscene extends ApiResponse {
  id: string
  name: string,
  description: string
  dialogue: Dialogue[]
}
export interface Dialogue {
  imageUrl: string,
  position: Position,
  speaker: string,
  text: string[]
}
enum Position {
  Left = "left",
  Center = "center",
  Right = "right"
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
