import { put, select, takeEvery } from "redux-saga/effects";

import { ApplicationState } from "../../root";

import { Profile } from "../_types";
import { DemoProfileActions } from "./_types";
import * as Actions from "./actions";

type ProfileSelector = (state: ApplicationState) => Profile;
const profileSelector: ProfileSelector = store => {
  if(!store.demo.content.data) {
    throw new Error("Demo Content has not been loaded...");
  }

  const profile = store.demo.content.data.initialProfile;
  return profile;
};

function* handleInit() {
  try {
    const profile = yield select(profileSelector);
    yield put(Actions.initializeSuccess(profile));
  } catch (err) {
    if (err instanceof Error) {
      yield put(Actions.initializeError(err.stack!));
    } else {
      yield put(Actions.initializeError("An unknown error occured."));
    }
  }
}

function* handleProfileUpdate() {
  yield put(Actions.profileUpdated());
}

export const sagas = [
  takeEvery(DemoProfileActions.INIT_REQUEST, handleInit),
  takeEvery([DemoProfileActions.ADD_QUESTREWARD, DemoProfileActions.REDEEM_REWARD], handleProfileUpdate)
];
