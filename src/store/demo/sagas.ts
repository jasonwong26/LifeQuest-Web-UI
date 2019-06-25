import { push } from "connected-react-router";
import { select, put, takeLatest } from "redux-saga/effects";

import { ApplicationState } from "../root";
import * as Types from "./_types";
import { dailyQuestsSelector, questsSelector } from "./selectors";
import * as Actions from "./actions";

import * as App from "./app";
import * as Content from "./content";
import * as Profile from "./profile";
import * as Cutscenes from "./cutscenes";
import * as Quests from "./quests";
import * as Events from "./events";
import * as Watchers from "./watchers";

type DemoStateSelector = (state: ApplicationState) => number;
const demoStateSelector: DemoStateSelector = store => {
  return store.demo.app.demoState;
};

function* bindContentInit() {
  yield put(Content.fetchRequest());
}

function* bindDemoInit() {
  yield put(App.initializeContent());
  yield put(Profile.initialize());
  yield put(Cutscenes.initialize());
  yield put(Quests.initialize());
  yield put(Events.initialize());
 yield put(push("/demo"));

  yield put(Actions.refreshDailyQuests());
}

function* bindNextStage() {
  const currStage: number = yield select(demoStateSelector);
  const nextStage = currStage + 1;

  yield put(App.loadStageRequest(nextStage));
  yield put(Cutscenes.loadStageRequest(nextStage));
  yield put(Quests.loadStageRequest(nextStage));
  yield put(Events.loadStageRequest(nextStage));

  yield put(Actions.refreshDailyQuests());
}
function* refreshDailyQuests() {
  const currentQueue: string[] = yield select(dailyQuestsSelector);
  const possibleQuests: Types.Quest[] = yield select(questsSelector, {
    dailyEnabled: true,
    active: false
  });

  for (const p of possibleQuests) {
    if(currentQueue.some(q => q === p.id)) break;
    yield put(App.queueDailyQuest(p));
  }
}
function* activateQuest(action: Types.PayloadAction<Types.Quest>) {
  const quest: Types.Quest = action.payload;
  yield put(App.deQueueDailyQuest(quest));

  const updated: Types.Quest = {...quest, active: true };
  yield put(Quests.updateQuest(updated));
  yield put(App.queueActiveQuest(updated));

  yield put(push("/demo"));
}

function* completeQuest(action: Types.PayloadAction<Types.Quest>) {
  const quest: Types.Quest = action.payload;
  yield put(App.deQueueActiveQuest(quest));

  const timestamp = new Date().getTime();
  const updated: Types.Quest = {
    ...quest,
    dailyEnabled: quest.repeatable,
    active: false,
    timesCompleted: quest.timesCompleted + 1,
    lastCompleted: timestamp
  };
  yield put(Quests.updateQuest(updated));
  yield put(Profile.addQuestReward(quest));
  // TODO: implement quest complete animation?
}

function* redeemReward(action: Types.PayloadAction<Types.Reward>) {
  const reward: Types.Reward = action.payload;
  yield put(Profile.redeemReward(reward));
}

const bindingSagas = [
  takeLatest(Types.DemoActions.INITIALIZE, bindContentInit),
  takeLatest(Content.DemoContentActions.FETCH_SUCCESS, bindDemoInit),
  takeLatest(Types.DemoActions.NEXT_STAGE, bindNextStage),
  takeLatest(Types.DemoActions.REFRESH_DAILYQUESTS, refreshDailyQuests),
  takeLatest(Types.DemoActions.ACTIVATE_QUEST, activateQuest),
  takeLatest(Types.DemoActions.COMPLETE_QUEST, completeQuest),
  takeLatest(Types.DemoActions.REDEEM_REWARD, redeemReward)
];


export const sagas = [
  ...App.sagas,
  ...Content.sagas,
  ...Profile.sagas,
  ...Cutscenes.sagas,
  ...Quests.sagas,
  ...Events.sagas,
  ...Watchers.sagas,
  ...bindingSagas
];
