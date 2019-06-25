import { combineReducers } from "redux";
import * as Types from "./_types";
import * as Content from "./content";
import * as App from "./app";
import * as Profile from "./profile";
import * as Cutscenes from "./cutscenes";
import * as Quests from "./quests";
import * as Events from "./events";
import * as Errors from "./errors";

export interface DemoState {
  readonly app: Types.AppSettings,
  readonly content: Content.DemoContentState,
  readonly profile: Types.Profile
  readonly cutscenes: Types.Cutscene[],
  readonly quests: Types.Quest[]
  readonly events: Types.EventListener[]
  readonly errors: Errors.ErrorLog[]
}

export const reducer = combineReducers<DemoState>({
  app: App.reducer,
  content: Content.reducer,
  profile: Profile.reducer,
  cutscenes: Cutscenes.reducer,
  quests: Quests.reducer,
  events: Events.reducer,
  errors: Errors.reducer
});
