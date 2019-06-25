import { action } from "typesafe-actions";

export const logError = (type: string, message?: string | Error) => action(type, message);
