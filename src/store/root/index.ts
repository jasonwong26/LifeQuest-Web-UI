import { combineReducers, Dispatch, Action, AnyAction } from "redux";
import { all } from "redux-saga/effects";

import { AuthUserState, authReducer, initialAuthState } from "../auth";

// The top-level state object.
export interface ApplicationState {
  auth: AuthUserState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer
});

export function* rootSaga() {
  yield all([]);
}

export const initialState: ApplicationState = {
  auth: initialAuthState
};
