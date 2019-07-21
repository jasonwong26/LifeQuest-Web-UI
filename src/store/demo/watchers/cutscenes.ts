import { select, put, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE } from "connected-react-router";
import { LocationState } from "history";
import * as Types from "../_types";

import * as App from "../app";
// import * as Content from "../content";
import * as Profile from "../profile";
import * as Cutscenes from "../cutscenes";
// import * as Quests from "../quests";
import * as Events from "../events";

import { PayloadAction } from "../_types";
import { DemoWatchersActions } from "./_types";
import * as Actions from "./actions";
import { eventsSelector, cutscenesSelector, profileSelector } from "./selectors";

function* queueCutscenesForStageLoad() {
  try {
    const filter = {
      active: true,
      triggerType: Types.TriggerType.IMMEDIATE,
      actionType: Types.ActionType.PLAY_CUTSCENE
    };
    const events: Types.EventListener[] = yield select(eventsSelector, filter);
    const scenes: Types.Cutscene[] = yield select(cutscenesSelector);

    for (let event of events) {
      let scene = scenes.find(s => s.id === event.actionId);
      if(!scene) throw new Error(`Cutscene ${event.actionId} could not be found to enqueue.`);

      scene = { ...scene, visible: true };
      yield put(Cutscenes.updateCutscene(scene));
      yield put(App.queueCutscene(scene));

      event = { ...event, active: false };
      yield put(Events.updateEvent(event));
    }
  } catch (err) {
    const type = DemoWatchersActions.IMMEDIATE_CUTSCENE_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}

function* queueCutscenesForPageLoad(action: PayloadAction<LocationState>) {
  try {
    const appPage = parseRouteForAppPage(action.payload.location.pathname);
    const filter = {
      active: true,
      triggerType: Types.TriggerType.PAGE_ACTIVE,
      triggerId: appPage,
      actionType: Types.ActionType.PLAY_CUTSCENE
    };

    const events: Types.EventListener[] = yield select(eventsSelector, filter);
    const scenes: Types.Cutscene[] = yield select(cutscenesSelector);

    for (let event of events) {
      let scene = scenes.find(s => s.id === event.actionId);
      if(!scene) throw new Error(`Cutscene ${event.actionId} could not be found to enqueue.`);

      scene = { ...scene, visible: true };
      yield put(Cutscenes.updateCutscene(scene));
      yield put(App.queueCutscene(scene));

      event = { ...event, active: false };
      yield put(Events.updateEvent(event));
    }
  } catch (err) {
    const type = DemoWatchersActions.IMMEDIATE_CUTSCENE_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}
const parseRouteForAppPage: (route: string) => Types.AppPages = route => {
  const dailyPattern = /\/daily$/g;
  if(dailyPattern.test(route)) {
    return Types.AppPages.DailyQuests;
  }
  const profilePattern = /\/profile$/g;
  if(profilePattern.test(route)) {
    return Types.AppPages.Profile;
  }

  // TODO: implement remaining mappings...

  return Types.AppPages.None;
};

function* queueCutscenesForQuestComplete(action: PayloadAction<Types.Quest>) {
  try {
    const quest: Types.Quest = action.payload;
    const filter = {
      active: true,
      triggerType: Types.TriggerType.QUEST_COMPLETED,
      triggerId: quest.id,
      actionType: Types.ActionType.PLAY_CUTSCENE
    };

    const events: Types.EventListener[] = yield select(eventsSelector, filter);
    const scenes: Types.Cutscene[] = yield select(cutscenesSelector);

    for (let event of events) {
      let scene = scenes.find(s => s.id === event.actionId);
      if(!scene) throw new Error(`Cutscene ${event.actionId} could not be found to enqueue.`);

      scene = { ...scene, visible: true };
      yield put(Cutscenes.updateCutscene(scene));
      yield put(App.queueCutscene(scene));

      event = { ...event, active: false };
      yield put(Events.updateEvent(event));
    }
  } catch (err) {
    const type = DemoWatchersActions.IMMEDIATE_CUTSCENE_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}

function* queueCutscenesForRewardAvailable() {
  try {
    const profile: Types.Profile = yield select(profileSelector);
    if(!doesAvailableRewardExist(profile)) return;

    const filter = {
      active: true,
      triggerType: Types.TriggerType.REWARD_AVAILABLE,
      actionType: Types.ActionType.PLAY_CUTSCENE
    };
    const events: Types.EventListener[] = yield select(eventsSelector, filter);
    const scenes: Types.Cutscene[] = yield select(cutscenesSelector);

    for (let event of events) {
      let scene = scenes.find(s => s.id === event.actionId);
      if(!scene) throw new Error(`Cutscene ${event.actionId} could not be found to enqueue.`);

      scene = { ...scene, visible: true };
      yield put(Cutscenes.updateCutscene(scene));
      yield put(App.queueCutscene(scene));

      event = { ...event, active: false };
      yield put(Events.updateEvent(event));
    }
  } catch (err) {
    const type = DemoWatchersActions.IMMEDIATE_CUTSCENE_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}
const doesAvailableRewardExist: (profile: Types.Profile) => boolean = profile => {
  const index = profile.rewards.findIndex(r => r.cost <= profile.rewardPoints);
  return index !== -1;
};

function* dequeueFinishedCutscene(action: PayloadAction<Types.Cutscene>) {
  try {
    const scene = action.payload;

    yield put(App.deQueueCutscene(scene));
    yield put(Cutscenes.updateCutscene(scene));
  } catch (err) {
    const type = DemoWatchersActions.CUTSCENE_FINISHED_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}

function* queueCutscenesForRewardRedeemed(action: PayloadAction<Types.Reward>) {
  try {
    const reward = action.payload;
    const filter = {
      active: true,
      triggerType: Types.TriggerType.REWARD_REDEEMED,
      triggerId: reward.id,
      actionType: Types.ActionType.PLAY_CUTSCENE
    };

    const events: Types.EventListener[] = yield select(eventsSelector, filter);
    const scenes: Types.Cutscene[] = yield select(cutscenesSelector);

    for (let event of events) {
      let scene = scenes.find(s => s.id === event.actionId);
      if(!scene) throw new Error(`Cutscene ${event.actionId} could not be found to enqueue.`);

      scene = { ...scene, visible: true };
      yield put(Cutscenes.updateCutscene(scene));
      yield put(App.queueCutscene(scene));

      event = { ...event, active: false };
      yield put(Events.updateEvent(event));
    }
  } catch (err) {
    const type = DemoWatchersActions.IMMEDIATE_CUTSCENE_ERROR;

    if (err instanceof Error) {
      yield put(Actions.logError(type, err));
    } else {
      yield put(Actions.logError(type, "An unknown error occured."));
    }
  }
}


export const sagas = [
  takeEvery(Events.DemoEventsActions.LOAD_STAGE_SUCCESS, queueCutscenesForStageLoad),
  takeEvery(LOCATION_CHANGE, queueCutscenesForPageLoad),
  takeEvery(Types.DemoActions.FINISH_CUTSCENE, dequeueFinishedCutscene),
  takeEvery(Types.DemoActions.COMPLETE_QUEST, queueCutscenesForQuestComplete),
  takeEvery(Profile.DemoProfileActions.PROFILE_UPDATED, queueCutscenesForRewardAvailable),
  takeEvery(Profile.DemoProfileActions.REDEEM_REWARD, queueCutscenesForRewardRedeemed),
];
