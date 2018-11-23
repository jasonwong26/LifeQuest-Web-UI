import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { callApi } from "../../../utility/callApi";
import { PayloadAction } from "../../shared";
import { authTokenSelector } from "../../root";
import { Character, CharactersActions } from "./_types";
import * as Actions from "./actions";

const API_HOST = process.env.REACT_APP_API || "";

function* handleFetch() {
  try {
    const token = yield select(authTokenSelector);
    const res = yield call(callApi, "get", API_HOST, "/admin/characters", null, token);

    if (!res.error) {
      yield put(Actions.fetchSuccess(res));
    } else {
      yield put(Actions.fetchError(res.error));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.fetchError(err.stack!));
    } else {
      yield put(Actions.fetchError("An unknown error occured."));
    }
  }
}

function* handleCreate(action: PayloadAction<Character>) {
  try {
    const character = action.payload;
    const token = yield select(authTokenSelector);
    const res = yield call(callApi, "post", API_HOST, `/admin/characters/`, character, token);

    if (!res.error) {
      yield put(Actions.createSuccess(res));
    } else {
      yield put(Actions.createError(res.error));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.createError(err.stack!));
    } else {
      yield put(Actions.createError("An unknown error occured."));
    }
  }
}

function* handleUpdate(action: PayloadAction<Character>) {
  try {
    const character = action.payload;
    const token = yield select(authTokenSelector);
    const res = yield call(callApi, "put", API_HOST, `/admin/characters/${character.id}`, character, token);

    if (!res.error) {
      yield put(Actions.updateSuccess(res));
    } else {
      yield put(Actions.updateError(res.error));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.updateError(err.stack!));
    } else {
      yield put(Actions.updateError("An unknown error occured."));
    }
  }
}

function* handleDelete(action: PayloadAction<Character>) {
  try {
    const character = action.payload;
    const token = yield select(authTokenSelector);
    const res = yield call(callApi, "delete", API_HOST, `/admin/characters/${character.id}`, character, token);

    if (!res.error) {
      yield put(Actions.deleteSuccess(character));
    } else {
      yield put(Actions.deleteError(res.error));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.deleteError(err.stack!));
    } else {
      yield put(Actions.deleteError("An unknown error occured."));
    }
  }
}

export const sagas = [
  takeEvery(CharactersActions.FETCH_REQUEST, handleFetch),
  takeLatest(CharactersActions.CREATE_REQUEST, handleCreate),
  takeLatest(CharactersActions.UPDATE_REQUEST, handleUpdate),
  takeLatest(CharactersActions.DELETE_REQUEST, handleDelete)
];
