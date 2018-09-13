import { action } from "typesafe-actions";
import { Cutscene, CutscenesActions } from "./_types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(CutscenesActions.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Cutscene[]) => action(CutscenesActions.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(CutscenesActions.FETCH_ERROR, message);

export const createRequest = (data: Cutscene) => action(CutscenesActions.CREATE_REQUEST, data);
export const createSuccess = (data: Cutscene) => action(CutscenesActions.CREATE_SUCCESS, data);
export const createError = (message: string) => action(CutscenesActions.CREATE_ERROR, message);

export const updateRequest = (data: Cutscene) => action(CutscenesActions.UPDATE_REQUEST, data);
export const updateSuccess = (data: Cutscene) => action(CutscenesActions.UPDATE_SUCCESS, data);
export const updateError = (message: string) => action(CutscenesActions.UPDATE_ERROR, message);

export const deleteRequest = (data: Cutscene) => action(CutscenesActions.DELETE_REQUEST, data);
export const deleteSuccess = (data: Cutscene) => action(CutscenesActions.DELETE_SUCCESS, data);
export const deleteError = (message: string) => action(CutscenesActions.DELETE_ERROR, message);
