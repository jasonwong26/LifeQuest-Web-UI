import { action } from "typesafe-actions";
import { Quest, QuestsActions } from "./_types";

export const fetchRequest = () => action(QuestsActions.FETCH_REQUEST);

export const fetchSuccess = (data: Quest[]) => action(QuestsActions.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(QuestsActions.FETCH_ERROR, message);

export const createRequest = (data: Quest) => action(QuestsActions.CREATE_REQUEST, data);
export const createSuccess = (data: Quest) => action(QuestsActions.CREATE_SUCCESS, data);
export const createError = (message: string) => action(QuestsActions.CREATE_ERROR, message);

export const updateRequest = (data: Quest) => action(QuestsActions.UPDATE_REQUEST, data);
export const updateSuccess = (data: Quest) => action(QuestsActions.UPDATE_SUCCESS, data);
export const updateError = (message: string) => action(QuestsActions.UPDATE_ERROR, message);

export const deleteRequest = (data: Quest) => action(QuestsActions.DELETE_REQUEST, data);
export const deleteSuccess = (data: Quest) => action(QuestsActions.DELETE_SUCCESS, data);
export const deleteError = (message: string) => action(QuestsActions.DELETE_ERROR, message);
