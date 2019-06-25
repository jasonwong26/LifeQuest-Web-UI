import { put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { ApplicationState } from "../../root";

import { AppSettings, PayloadAction } from "../_types";
import { DemoAppActions } from "./_types";
import * as Actions from "./actions";

type AppSettingsSelector = (state: ApplicationState, index: number) => AppSettings;
const appSettingsSelector: AppSettingsSelector = (store, index) => {
  if(!store.demo.content.data) {
    throw new Error("Demo Content has not been loaded...");
  }
  const state = store.demo.app;
  const activePages = store.demo.content.data.stages[index].activePages;
  const result = {...state, activePages, demoState: index };
  return result;
};

function* handleInit() {
  try {
    const settings = yield select(appSettingsSelector, 0);
    yield put(Actions.loadStageSuccess(settings));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.loadStageError(err.stack!));
    } else {
      yield put(Actions.loadStageError("An unknown error occured."));
    }
  }
}

function* handleLoadStageRequest(action: PayloadAction<number>) {
  const index = action.payload;
  try {
    const settings = yield select(appSettingsSelector, index);
    yield put(Actions.loadStageSuccess(settings));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.loadStageError(err.stack!));
    } else {
      yield put(Actions.loadStageError("An unknown error occured."));
    }
  }
}

export const sagas = [
  takeEvery(DemoAppActions.INIT_REQUEST, handleInit),
  takeLatest(DemoAppActions.LOAD_STAGE_REQUEST, handleLoadStageRequest)
];
