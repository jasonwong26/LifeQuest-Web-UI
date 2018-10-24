import { Reducer } from "redux";
import { Character, CharactersState, CharactersActions } from "./_types";

export const initialState: CharactersState = {
  data: [],
  errors: undefined,
  loading: false,
  saving: false,
  deleting: false
};

export const reducer: Reducer<CharactersState> = (state = initialState, action) => {
  switch (action.type) {
    case CharactersActions.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case CharactersActions.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CharactersActions.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }

    case CharactersActions.CREATE_REQUEST:
    case CharactersActions.UPDATE_REQUEST: {
      return {...state, saving: true };
    }

    case CharactersActions.CREATE_SUCCESS: {
      const newChar: Character = action.payload;
      const newState  = [...state.data, newChar];

      return { ...state, saving: false, data: newState };
    }

    case CharactersActions.UPDATE_SUCCESS: {
      const updated: Character = action.payload;
      const newState  = state.data.map(current => {
        return current.id === updated.id
          ? updated
          : current;
      });

      return { ...state, saving: false, data: newState };
    }

    case CharactersActions.CREATE_ERROR:
    case CharactersActions.UPDATE_ERROR: {
      return { ...state, saving: false, errors: action.payload };
    }


    case CharactersActions.DELETE_REQUEST: {
      return {...state, deleting: true };
    }

    case CharactersActions.DELETE_SUCCESS: {
      const deleted: Character = action.payload;
      const newState  = state.data.filter(current => {
        return current.id !== deleted.id;
      });

      return { ...state, deleting: false, data: newState };
    }

    case CharactersActions.DELETE_ERROR: {
      return {...state, deleting: false };
    }

    default: {
      return state;
    }
  }
};
