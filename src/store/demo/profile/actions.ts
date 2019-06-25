import { action } from "typesafe-actions";

import { Profile, Quest, Reward } from "../_types";
import { DemoProfileActions } from "./_types";

export const initialize = () => action(DemoProfileActions.INIT_REQUEST);

export const initializeSuccess = (data: Profile) => action(DemoProfileActions.INIT_SUCCESS, data);
export const initializeError = (message: string) => action(DemoProfileActions.INIT_ERROR, message);

export const addQuestReward = (data: Quest) => action(DemoProfileActions.ADD_QUESTREWARD, data);
export const redeemReward = (reward: Reward) => action(DemoProfileActions.REDEEM_REWARD, reward);

export const profileUpdated = () => action(DemoProfileActions.PROFILE_UPDATED);
