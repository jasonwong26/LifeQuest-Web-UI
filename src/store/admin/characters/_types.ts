import { ApiResponse } from "../../../utility/callApi";

export interface Character extends ApiResponse {
  id: string
  name: string,
  description: string,
  created: number,
  lastUpdated: number
}

export const enum CharactersActions {
  FETCH_REQUEST = "@@characters/FETCH_REQUEST",
  FETCH_SUCCESS = "@@characters/FETCH_SUCCESS",
  FETCH_ERROR = "@@characters/FETCH_ERROR",
  SELECT = "@@characters/SELECT",
  SELECTED = "@@characters/SELECTED"
}

export interface CharactersState {
  readonly loading: boolean
  readonly data: Character[]
  readonly errors?: string
}
