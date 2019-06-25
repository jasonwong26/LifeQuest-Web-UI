import { action } from "typesafe-actions";

import { Quest } from "../_types";
import { DemoQuestsActions } from "./_types";

// Initial Demo Load, loads 1st stage
export const initialize = () => action(DemoQuestsActions.INIT_REQUEST, 0);
export const loadStageRequest = (index: number) => action(DemoQuestsActions.LOAD_STAGE_REQUEST, index);

export const loadStageSuccess = (data: Quest[]) => action(DemoQuestsActions.LOAD_STAGE_SUCCESS, data);
export const loadStageError = (message: string) => action(DemoQuestsActions.LOAD_STAGE_ERROR, message);

export const updateQuest = (data: Quest) => action(DemoQuestsActions.UPDATE_QUEST, data);
