import { put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { ApplicationState } from "../../root";

import { Quest, PayloadAction } from "../_types";
import { DemoQuestsActions } from "./_types";
import * as Actions from "./actions";

type QuestsSelector = (state: ApplicationState, index: number) => Quest[];
const questsSelector: QuestsSelector = (store, index) => {
  if(!store.demo.content.data) {
    throw new Error("Demo Content has not been loaded...");
  }

  const quests = store.demo.content.data.stages[index].quests;
  return quests;
};

function* handleInit() {
  try {
    const quests = yield select(questsSelector, 0);
    yield put(Actions.loadStageSuccess(quests));
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
    const quests = yield select(questsSelector, index);
    yield put(Actions.loadStageSuccess(quests));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.loadStageError(err.stack!));
    } else {
      yield put(Actions.loadStageError("An unknown error occured."));
    }
  }
}

export const sagas = [
  takeEvery(DemoQuestsActions.INIT_REQUEST, handleInit),
  takeLatest(DemoQuestsActions.LOAD_STAGE_REQUEST, handleLoadStageRequest)
];
