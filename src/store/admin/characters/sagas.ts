import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { callApi } from "../../../utility/callApi";
import { CharactersActions } from "./_types";
import { fetchError, fetchSuccess } from "./actions";

const API_HOST = process.env.REACT_APP_API || "";

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, "get", API_HOST, "/admin/characters");

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError("An unknown error occured."));
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(CharactersActions.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* listSaga() {
  yield all([fork(watchFetchRequest)]);
}

export {
  listSaga as charactersListSaga
};
