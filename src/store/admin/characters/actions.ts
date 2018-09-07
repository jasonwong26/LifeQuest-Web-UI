import { action } from "typesafe-actions";
import { Character, CharactersActions } from "./_types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(CharactersActions.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Character[]) => action(CharactersActions.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(CharactersActions.FETCH_ERROR, message);

export const updateRequest = (data: Character) => action(CharactersActions.UPDATE_REQUEST, data);
export const updateSuccess = (data: Character) => action(CharactersActions.UPDATE_SUCCESS, data);
export const updateError = (message: string) => action(CharactersActions.UPDATE_ERROR, message);
