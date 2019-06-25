import { DataStatus } from "../../shared";
import { DemoContent } from "../_types";

export enum DemoContentActions {
  FETCH_REQUEST = "@@demoContent/FETCH_REQUEST",
  FETCH_SUCCESS = "@@demoContent/FETCH_SUCCESS",
  FETCH_ERROR = "@@demoContent/FETCH_ERROR",

  LOAD_STAGE_REQUEST = "@@demoContent/LOAD_STAGE_REQUEST",
  LOAD_STAGE_SUCCESS = "@@demoContent/LOAD_STAGE_SUCCESS",
  LOAD_STAGE_ERROR = "@@demoContent/LOAD_STAGE_ERROR"
}

export interface DemoContentState {
  readonly data?: DemoContent
  readonly status: DataStatus,
  readonly errors?: string
}
