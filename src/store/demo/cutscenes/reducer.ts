import { Reducer } from "redux";

import { Cutscene } from "../_types";
import { DemoCutscenesActions } from "./_types";

export const initialState: Cutscene[] = [];

export const reducer: Reducer<Cutscene[]> = (state = initialState, action) => {
  switch (action.type) {
    case DemoCutscenesActions.INIT_SUCCESS: {
      return action.payload;
    }

    case DemoCutscenesActions.LOAD_STAGE_SUCCESS: {
      return [...state, ...action.payload];
    }

    case DemoCutscenesActions.UPDATE_SCENE: {
      const updated: Cutscene = action.payload;
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
