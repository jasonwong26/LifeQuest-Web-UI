import { Reducer } from "redux";
import { CharactersState, CharactersActions } from "./_types";

// Type-safe initialState!
const initialState: CharactersState = {
  data: [],
  errors: undefined,
  loading: false
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
    default: {
      return state;
    }
  }
};

export {
  initialState as initialCharactersState,
  reducer as charactersReducer
};
