import { Reducer } from "redux";
import { DataStatus } from "../../shared";
import { Cutscene, CutscenesState, CutscenesActions } from "./_types";

export const initialState: CutscenesState = {
  data: [],
  status: DataStatus.PENDING,
  errors: undefined
};

export const reducer: Reducer<CutscenesState> = (state = initialState, action) => {
  switch (action.type) {
    case CutscenesActions.FETCH_REQUEST: {
      return { ...state, status: DataStatus.LOADING };
    }
    case CutscenesActions.FETCH_SUCCESS: {
      return { ...state, status: DataStatus.READY, data: action.payload };
    }

    case CutscenesActions.CREATE_REQUEST:
    case CutscenesActions.UPDATE_REQUEST: {
      return {...state, status: DataStatus.SAVING };
    }

    case CutscenesActions.CREATE_SUCCESS: {
      const newChar: Cutscene = action.payload;
      const newState  = [...state.data, newChar];

      return { ...state, status: DataStatus.READY, data: newState };
    }

    case CutscenesActions.UPDATE_SUCCESS: {
      const updated: Cutscene = action.payload;
      const newState  = state.data.map(current => {
        return current.id === updated.id
          ? updated
          : current;
      });

      return { ...state, status: DataStatus.READY, data: newState };
    }

    case CutscenesActions.DELETE_REQUEST: {
      return {...state, status: DataStatus.DELETING };
    }

    case CutscenesActions.DELETE_SUCCESS: {
      const deleted: Cutscene = action.payload;
      const newState  = state.data.filter(current => {
        return current.id === deleted.id;
      });

      return { ...state, status: DataStatus.READY, data: newState };
    }

    case CutscenesActions.FETCH_ERROR:
    case CutscenesActions.CREATE_ERROR:
    case CutscenesActions.UPDATE_ERROR:
    case CutscenesActions.DELETE_ERROR: {
      return { ...state, status: DataStatus.READY, errors: action.payload };
    }

    default: {
      return state;
    }
  }
};
