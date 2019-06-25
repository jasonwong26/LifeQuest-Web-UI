import { Reducer } from "redux";

import { Profile, Quest, Reward } from "../_types";
import { DemoProfileActions } from "./_types";

export const initialState: Profile = {
  level: 1,
  experience: 0,
  nextLevelExp: undefined,
  rewardPoints: 0,
  rewards: []
};

export const reducer: Reducer<Profile> = (state = initialState, action) => {
  switch (action.type) {
    case DemoProfileActions.INIT_SUCCESS: {
      return action.payload;
    }

    case DemoProfileActions.ADD_QUESTREWARD: {
      const quest: Quest = action.payload;
      return {
        ...state,
        experience: state.experience + quest.experience,
        rewardPoints: state.rewardPoints + quest.rewardPoints
      };
    }

    case DemoProfileActions.REDEEM_REWARD: {
      const reward: Reward = action.payload;
      const index = state.rewards.findIndex(r => r.id === reward.id);

      const rewards = state.rewards.map((r, i) => {
        return i !== index
        ? r
        : {...r, timesRedeemed: r.timesRedeemed + 1 };
      });

      return {
        ...state,
        rewardPoints: state.rewardPoints - reward.cost,
        rewards
      };
    }

    default: {
      return state;
    }
  }
};
