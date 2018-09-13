import { ApiResponse } from "../../../utility/callApi";


export interface Character extends ApiResponse {
  id: string
  name: string,
  description: string,
  created: number,
  lastUpdated: number
  images: CharacterImage[]
}
export interface CharacterImage {
  url: string,
  title: string,
  notes?: string
}

export enum CharactersActions {
  FETCH_REQUEST = "@@characters/FETCH_REQUEST",
  FETCH_SUCCESS = "@@characters/FETCH_SUCCESS",
  FETCH_ERROR = "@@characters/FETCH_ERROR",

  CREATE_REQUEST = "@@characters/CREATE_REQUEST",
  CREATE_SUCCESS = "@@characters/CREATE_SUCCESS",
  CREATE_ERROR = "@@characters/CREATE_ERROR",

  UPDATE_REQUEST = "@@characters/UPDATE_REQUEST",
  UPDATE_SUCCESS = "@@characters/UPDATE_SUCCESS",
  UPDATE_ERROR = "@@characters/UPDATE_ERROR",

  DELETE_REQUEST = "@@characters/DELETE_REQUEST",
  DELETE_SUCCESS = "@@characters/DELETE_SUCCESS",
  DELETE_ERROR = "@@characters/DELETE_ERROR"
}

export interface CharactersState {
  readonly loading: boolean,
  readonly saving: boolean,
  readonly deleting: boolean,
  readonly data: Character[]
  readonly errors?: string
}
