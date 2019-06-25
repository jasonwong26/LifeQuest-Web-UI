import { put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { ApplicationState } from "../../root";

import { Cutscene, PayloadAction } from "../_types";
import { DemoCutscenesActions } from "./_types";
import * as Actions from "./actions";

type CutscenesSelector = (state: ApplicationState, index: number) => Cutscene[];
const cutscenesSelector: CutscenesSelector = (store, index) => {
  if(!store.demo.content.data) {
    throw new Error("Demo Content has not been loaded...");
  }

  const cutscenes = store.demo.content.data.stages[index].cutscenes;
  return cutscenes;
};

function* handleInit() {
  try {
    const cutscenes = yield select(cutscenesSelector, 0);
    yield put(Actions.loadStageSuccess(cutscenes));
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
    const cutscenes = yield select(cutscenesSelector, index);
    yield put(Actions.loadStageSuccess(cutscenes));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.loadStageError(err.stack!));
    } else {
      yield put(Actions.loadStageError("An unknown error occured."));
    }
  }
}

export const sagas = [
  takeEvery(DemoCutscenesActions.INIT_REQUEST, handleInit),
  takeLatest(DemoCutscenesActions.LOAD_STAGE_REQUEST, handleLoadStageRequest)
];
