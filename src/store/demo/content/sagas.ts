import { put, takeEvery } from "redux-saga/effects";

import { DemoContentActions } from "./_types";
import * as Actions from "./actions";
import { example } from "./Example";

function* handleFetch() {
  try {
    const content = example;
    yield put(Actions.fetchSuccess(content));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.fetchError(err.stack!));
    } else {
      yield put(Actions.fetchError("An unknown error occured."));
    }
  }
}

export const sagas = [
  takeEvery(DemoContentActions.FETCH_REQUEST, handleFetch)
];
