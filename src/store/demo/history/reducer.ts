import { Reducer } from "redux";
import * as Types from "../_types";

export const initialState: Types.LogEvent[] = [];

export const reducer: Reducer<Types.LogEvent[]> = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
