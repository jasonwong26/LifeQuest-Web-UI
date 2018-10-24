import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { AuthUserState, authReducer } from "../auth";
import * as Characters from "../admin/characters";
import * as Cutscenes from "../admin/cutscenes";
import * as Quests from "../admin/quests";

// The top-level state object.
export interface ApplicationState {
  auth: AuthUserState,
  characters: Characters.CharactersState,
  cutscenes: Cutscenes.CutscenesState,
  quests: Quests.QuestsState
}

export const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
  characters: Characters.reducer,
  cutscenes: Cutscenes.reducer,
  quests: Quests.reducer
});

export function* rootSaga() {
  yield all([
    ...Characters.sagas,
    ...Cutscenes.sagas,
    ...Quests.sagas
  ]);
}
