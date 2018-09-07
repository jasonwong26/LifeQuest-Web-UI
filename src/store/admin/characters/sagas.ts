import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { callApi } from "../../../utility/callApi";
import { Character, CharactersActions, PayloadAction } from "./_types";
import { fetchError, fetchSuccess, updateError, updateSuccess } from "./actions";

const API_HOST = process.env.REACT_APP_API || "";

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, "get", API_HOST, "/admin/characters");

    if (!res.error) {
      yield put(fetchSuccess(res));
    } else {
      yield put(fetchError(res.error));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!));
    } else {
      yield put(fetchError("An unknown error occured."));
    }
  }
}

function* handleUpdate(action: PayloadAction<Character>) {
  try {
    const character = action.payload;
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, "put", API_HOST, `/admin/characters/${character.id}`, character);

    if (!res.error) {
      yield put(updateSuccess(res));
    } else {
      yield put(updateError(res.error));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(updateError(err.stack!));
    } else {
      yield put(updateError("An unknown error occured."));
    }
  }
}

export const characterSagas = [
  takeEvery(CharactersActions.FETCH_REQUEST, handleFetch),
  takeLatest(CharactersActions.UPDATE_REQUEST, handleUpdate)
];
