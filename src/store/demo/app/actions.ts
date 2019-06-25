import { action } from "typesafe-actions";

import { AppSettings, Cutscene, Quest } from "../_types";
import { DemoAppActions } from "./_types";

// Initial Demo Load, loads 1st stage
export const initializeContent = () => action(DemoAppActions.INIT_REQUEST, 0);
export const loadStageRequest = (index: number) => action(DemoAppActions.LOAD_STAGE_REQUEST, index);

export const loadStageSuccess = (data: AppSettings) => action(DemoAppActions.LOAD_STAGE_SUCCESS, data);
export const loadStageError = (message: string) => action(DemoAppActions.LOAD_STAGE_ERROR, message);

export const queueCutscene = (scene: Cutscene) => action(DemoAppActions.QUEUE_CUTSCENE, scene);
export const deQueueCutscene = (scene: Cutscene) => action(DemoAppActions.DEQUEUE_CUTSCENE, scene);

export const queueDailyQuest = (quest: Quest) => action(DemoAppActions.QUEUE_DAILYQUEST, quest);
export const deQueueDailyQuest = (quest: Quest) => action(DemoAppActions.DEQUEUE_DAILYQUEST, quest);

export const queueActiveQuest = (quest: Quest) => action(DemoAppActions.QUEUE_ACTIVEQUEST, quest);
export const deQueueActiveQuest = (quest: Quest) => action(DemoAppActions.DEQUEUE_ACTIVEQUEST, quest);
