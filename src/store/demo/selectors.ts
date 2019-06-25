import { ApplicationState } from "../root";
import * as Types from "./_types";

export interface QuestFilter {
  active?: boolean,
  dailyEnabled?: boolean,
  repeatable?: boolean,
}
type QuestsSelector = (state: ApplicationState, filter?: QuestFilter) => Types.Quest[];
export const questsSelector: QuestsSelector = (store, filter) => {
  const quests = store.demo.quests;

  if(!filter) return quests;

  // TODO: reimplement as loop through filter keys, look for matching props & values.
  let filtered = quests;
  if(filter.active != null) {
    filtered = filtered.filter(f => f.active === filter.active);
  }
  if(filter.dailyEnabled != null) {
    filtered = filtered.filter(f => f.dailyEnabled === filter.dailyEnabled);
  }
  if(filter.repeatable != null) {
    filtered = filtered.filter(f => f.repeatable === filter.repeatable);
  }

  return filtered;
};

type DailyQuestsSelector = (state: ApplicationState) => string[];
export const dailyQuestsSelector: DailyQuestsSelector = state => {
  return state.demo.app.dailyQuestQueue;
};
