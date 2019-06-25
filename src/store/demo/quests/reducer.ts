import { Reducer } from "redux";

import { Quest } from "../_types";
import { DemoQuestsActions } from "./_types";

export const initialState: Quest[] = [];

export const reducer: Reducer<Quest[]> = (state = initialState, action) => {
  switch (action.type) {
    case DemoQuestsActions.INIT_SUCCESS: {
      return action.payload;
    }

    case DemoQuestsActions.LOAD_STAGE_SUCCESS: {
      return [...state, ...action.payload];
    }

    case DemoQuestsActions.UPDATE_QUEST: {
      const updated: Quest = action.payload;
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
