import { combineReducers, Dispatch, Action, AnyAction } from "redux";
import { all } from "redux-saga/effects";

import { AuthUserState, authReducer, initialAuthState } from "../auth";
import { characterSagas, CharactersState, charactersReducer, initialCharactersState } from "../admin/characters";

// The top-level state object.
export interface ApplicationState {
  auth: AuthUserState,
  characters: CharactersState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
  characters: charactersReducer
});

export function* rootSaga() {
  yield all([
    ...characterSagas
  ]);
}

export const initialState: ApplicationState = {
  auth: initialAuthState,
  characters: initialCharactersState
};
