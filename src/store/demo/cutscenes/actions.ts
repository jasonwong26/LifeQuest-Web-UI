import { action } from "typesafe-actions";

import { Cutscene } from "../_types";
import { DemoCutscenesActions } from "./_types";

// Initial Demo Load, loads 1st stage
export const initialize = () => action(DemoCutscenesActions.INIT_REQUEST, 0);
export const loadStageRequest = (index: number) => action(DemoCutscenesActions.LOAD_STAGE_REQUEST, index);

export const loadStageSuccess = (data: Cutscene[]) => action(DemoCutscenesActions.LOAD_STAGE_SUCCESS, data);
export const loadStageError = (message: string) => action(DemoCutscenesActions.LOAD_STAGE_ERROR, message);

export const updateCutscene = (data: Cutscene) => action(DemoCutscenesActions.UPDATE_SCENE, data);
