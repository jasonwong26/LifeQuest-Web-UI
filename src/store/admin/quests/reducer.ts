import { Reducer } from "redux";
import { DataStatus } from "../../shared";
import { Quest, QuestsState, QuestsActions } from "./_types";

export const initialState: QuestsState = {
  data: [],
  status: DataStatus.PENDING,
  errors: undefined
};

export const reducer: Reducer<QuestsState> = (state = initialState, action) => {
  switch (action.type) {
    case QuestsActions.FETCH_REQUEST: {
      return { ...state, status: DataStatus.LOADING };
    }
    case QuestsActions.FETCH_SUCCESS: {
      return { ...state, status: DataStatus.READY, data: action.payload };
    }

    case QuestsActions.CREATE_REQUEST:
    case QuestsActions.UPDATE_REQUEST: {
      return {...state, status: DataStatus.SAVING };
    }

    case QuestsActions.CREATE_SUCCESS: {
      const created: Quest = action.payload;
      const newState  = [...state.data, created];

      return { ...state, status: DataStatus.READY, data: newState };
    }

    case QuestsActions.UPDATE_SUCCESS: {
      const updated: Quest = action.payload;
      const newState  = state.data.map(current => {
        return current.id === updated.id
          ? updated
          : current;
      });

      return { ...state, status: DataStatus.READY, data: newState };
    }

    case QuestsActions.DELETE_REQUEST: {
      return {...state, status: DataStatus.DELETING };
    }

    case QuestsActions.DELETE_SUCCESS: {
      const deleted: Quest = action.payload;
      const newState  = state.data.filter(current => {
        return current.id !== deleted.id;
      });

      return { ...state, status: DataStatus.READY, data: newState };
    }

    case QuestsActions.FETCH_ERROR:
    case QuestsActions.CREATE_ERROR:
    case QuestsActions.UPDATE_ERROR:
    case QuestsActions.DELETE_ERROR: {
      return { ...state, status: DataStatus.READY, errors: action.payload };
    }

    default: {
      return state;
    }
  }
};
