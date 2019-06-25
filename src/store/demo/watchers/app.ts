import { select, put, takeLatest } from "redux-saga/effects";

import * as Types from "../_types";
import * as Demo from "../actions";

// import * as App from "../app";
// import * as Content from "../content";
// import * as Profile from "../profile";
// import * as Cutscenes from "../cutscenes";
// import * as Quests from "../quests";
import * as Events from "../events";

import { PayloadAction } from "../_types";
import { DemoWatchersActions } from "./_types";
import * as Actions from "./actions";
import { eventsSelector } from "./selectors";

function* loadNextStage(action: PayloadAction<Types.Cutscene>) {
  try {
    const scene: Types.Cutscene = action.payload;
    const filter = {
      active: true,
      triggerType: Types.TriggerType.CUTSCENE_WATCHED,
      triggerId: scene.id,
      actionType: Types.ActionType.NEXT_STAGE
    };
    const events: Types.EventListener[] = yield select(eventsSelector, filter);

    for (let event of events) {
      yield put(Demo.nextStage());

      event = { ...event, active: false };
      yield put(Events.updateEvent(event));
    }
  } catch (err) {
    const type = DemoWatchersActions.LOAD_NEXT_STAGE_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}

export const sagas = [
  takeLatest(Types.DemoActions.FINISH_CUTSCENE, loadNextStage)
];
