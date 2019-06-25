
import { action } from "typesafe-actions";

import { DemoActions, Cutscene, Quest, Reward } from "./_types";

export const initialize = () => action(DemoActions.INITIALIZE);
export const nextStage = () => action(DemoActions.NEXT_STAGE);

export const queueCutscene = (scene: Cutscene) => action(DemoActions.QUEUE_CUTSCENE, scene);
export const finishCutscene = (scene: Cutscene) => action(DemoActions.FINISH_CUTSCENE, scene);
export const skipCutscene = (scene: Cutscene) => action(DemoActions.SKIP_CUTSCENE, scene);

export const refreshDailyQuests = () => action(DemoActions.REFRESH_DAILYQUESTS);
export const activateQuest = (quest: Quest) => action(DemoActions.ACTIVATE_QUEST, quest);
export const completeQuest = (quest: Quest) => action(DemoActions.COMPLETE_QUEST, quest);
export const dropQuest = (quest: Quest) => action(DemoActions.DROP_QUEST, quest);

export const redeemReward = (reward: Reward) => action(DemoActions.REDEEM_REWARD, reward);
