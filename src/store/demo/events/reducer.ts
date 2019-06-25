import { Reducer } from "redux";

import { EventListener } from "../_types";
import { DemoEventsActions } from "./_types";

export const initialState: EventListener[] = [];

export const reducer: Reducer<EventListener[]> = (state = initialState, action) => {
  switch (action.type) {
    case DemoEventsActions.INIT_SUCCESS: {
      return action.payload;
    }

    case DemoEventsActions.LOAD_STAGE_SUCCESS: {
      return [...state, ...action.payload];
    }

    case DemoEventsActions.UPDATE_EVENT: {
      const updated: EventListener = action.payload;
      const newState  = state.map(current => {
        return current.id === updated.id
          ? updated
          : current;
      });

      return newState;
    }

    default: {
      return state;
    }
  }
};
