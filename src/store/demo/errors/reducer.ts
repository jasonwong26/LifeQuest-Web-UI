import { Reducer } from "redux";
import { ErrorLog } from "./_types";

export const initialState: ErrorLog[] = [];

export const reducer: Reducer<ErrorLog[]> = (state = initialState, action) => {
  const pattern = /@@demo.+\/.+_ERROR/;

  if(pattern.test(action.type)) {
    const newError: ErrorLog = {
      type: action.type,
      asOfDate: new Date(),
      error: action.payload
    };

    return [newError, ...state];
  }

  return state;
};
