import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import * as Auth from "../auth";
import * as Characters from "../admin/characters";
import * as Cutscenes from "../admin/cutscenes";
import * as Quests from "../admin/quests";

import * as Demo from "../demo";

// The top-level state object.
export interface ApplicationState {
  auth: Auth.AuthState,
  characters: Characters.CharactersState,
  cutscenes: Cutscenes.CutscenesState,
  quests: Quests.QuestsState,
  demo: Demo.DemoState
}

type AuthTokenSelector = (state: ApplicationState) => string | undefined;
export const authTokenSelector: AuthTokenSelector = store => {
  return store.auth.user.accessToken;
};

export const rootReducer = combineReducers<ApplicationState>({
  auth: Auth.reducer,
  characters: Characters.reducer,
  cutscenes: Cutscenes.reducer,
  quests: Quests.reducer,
  demo: Demo.reducer
});

export function* rootSaga() {
  yield all([
    ...Auth.sagas,
    ...Characters.sagas,
    ...Cutscenes.sagas,
    ...Quests.sagas,
    ...Demo.sagas
  ]);
}
