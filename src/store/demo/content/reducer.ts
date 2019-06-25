import { Reducer } from "redux";

import { DataStatus } from "../../shared";
import { DemoContentActions, DemoContentState } from "./_types";

export const initialState: DemoContentState = {
  data: undefined,
  status: DataStatus.PENDING
};

export const reducer: Reducer<DemoContentState> = (state = initialState, action) => {
  switch (action.type) {
    case DemoContentActions.FETCH_REQUEST: {
      return { ...state, status: DataStatus.LOADING };
    }
    case DemoContentActions.FETCH_SUCCESS: {
      return { ...state, status: DataStatus.READY, data: action.payload };
    }
    case DemoContentActions.FETCH_ERROR: {
      return { ...state, status: DataStatus.READY, errors: action.payload };
    }

    default: {
      return state;
    }
  }
};
