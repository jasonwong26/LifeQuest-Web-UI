import { action } from "typesafe-actions";

import { EventListener } from "../_types";
import { DemoEventsActions } from "./_types";

// Initial Demo Load, loads 1st stage
export const initialize = () => action(DemoEventsActions.INIT_REQUEST, 0);
export const loadStageRequest = (index: number) => action(DemoEventsActions.LOAD_STAGE_REQUEST, index);

export const loadStageSuccess = (data: EventListener[]) => action(DemoEventsActions.LOAD_STAGE_SUCCESS, data);
export const loadStageError = (message: string) => action(DemoEventsActions.LOAD_STAGE_ERROR, message);

export const updateEvent = (event: EventListener) => action(DemoEventsActions.UPDATE_EVENT, event);
