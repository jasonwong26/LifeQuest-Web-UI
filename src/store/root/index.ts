import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { AuthUserState, authReducer } from "../auth";
import { characterSagas, CharactersState, charactersReducer } from "../admin/characters";
import * as Cutscenes from "../admin/cutscenes";

// The top-level state object.
export interface ApplicationState {
  auth: AuthUserState,
  characters: CharactersState,
  cutscenes: Cutscenes.CutscenesState
}

export const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
  characters: charactersReducer,
  cutscenes: Cutscenes.reducer
});

export function* rootSaga() {
  yield all([
    ...characterSagas,
    ...Cutscenes.sagas
  ]);
}
