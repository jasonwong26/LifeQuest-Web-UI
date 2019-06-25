import { put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { ApplicationState } from "../../root";

import { EventListener, PayloadAction } from "../_types";
import { DemoEventsActions } from "./_types";
import * as Actions from "./actions";

type EventsSelector = (state: ApplicationState, index: number) => EventListener[];
const eventsSelector: EventsSelector = (store, index) => {
  if(!store.demo.content.data) {
    throw new Error("Demo Content has not been loaded...");
  }

  const events = store.demo.content.data.stages[index].events;
  return events;
};

function* handleInit() {
  try {
    const events = yield select(eventsSelector, 0);
    yield put(Actions.loadStageSuccess(events));
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
    const events = yield select(eventsSelector, index);
    yield put(Actions.loadStageSuccess(events));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.loadStageError(err.stack!));
    } else {
      yield put(Actions.loadStageError("An unknown error occured."));
    }
  }
}

export const sagas = [
  takeEvery(DemoEventsActions.INIT_REQUEST, handleInit),
  takeLatest(DemoEventsActions.LOAD_STAGE_REQUEST, handleLoadStageRequest)
];
