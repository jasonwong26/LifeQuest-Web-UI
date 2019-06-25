import { action } from "typesafe-actions";

import { DemoContent, DemoStage } from "../_types";
import { DemoContentActions } from "./_types";

export const fetchRequest = () => action(DemoContentActions.FETCH_REQUEST);

export const fetchSuccess = (data: DemoContent) => action(DemoContentActions.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(DemoContentActions.FETCH_ERROR, message);

// Initial Demo Load, loads iinit profile & 1st stage
export const initializeContent = () => action(DemoContentActions.LOAD_STAGE_REQUEST, 0);
// Ease of use wrapper - loads next stage
export const loadNextStageRequest = () => action(DemoContentActions.LOAD_STAGE_REQUEST);
// low level & testing level function
export const loadStageRequest = (index: number) => action(DemoContentActions.LOAD_STAGE_REQUEST, index);

export const loadStageSuccess = (data: DemoStage) => action(DemoContentActions.LOAD_STAGE_SUCCESS, data);
export const loadStageError = (message: string) => action(DemoContentActions.LOAD_STAGE_ERROR, message);
