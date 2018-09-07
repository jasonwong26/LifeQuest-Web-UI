import { Reducer } from "redux";
import { Character, CharactersState, CharactersActions } from "./_types";

// Type-safe initialState!
const initialState: CharactersState = {
  data: [],
  errors: undefined,
  loading: false,
  saving: false,
  deleting: false
};

const reducer: Reducer<CharactersState> = (state = initialState, action) => {
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

    case CharactersActions.UPDATE_REQUEST: {
      return {...state, saving: true };
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
    case CharactersActions.UPDATE_ERROR: {
      return { ...state, saving: false, errors: action.payload };
    }

    default: {
      return state;
    }
  }
};

export {
  initialState as initialCharactersState,
  reducer as charactersReducer
};
