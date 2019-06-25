import { ApplicationState } from "../../root";

import * as Types from "../_types";

export interface EventListenerFilter {
  triggerType?: Types.TriggerType,
  triggerId?: Types.TriggerIdType,
  actionType? : Types.ActionType,
  active?: boolean,
}
export type EventsSelector = (state: ApplicationState, filter?: EventListenerFilter) => Types.EventListener[];

export interface CutsceneFilter {
  watched?: boolean
}
export type CutscenesSelector = (state: ApplicationState, filter?: CutsceneFilter) => Types.Cutscene[];

export type ProfileSelector = (state: ApplicationState) => Types.Profile;

export const eventsSelector: EventsSelector = (store, filter) => {
  const events = store.demo.events;

  if(!filter) return events;

  // TODO: reimplement as loop through filter keys, look for matching props & values.
  let filtered = events;
  if(filter.active != null) {
    filtered = filtered.filter(f => f.active === filter.active);
  }
  if(filter.triggerType != null) {
    filtered = filtered.filter(f => f.triggerType === filter.triggerType);
  }
  if(filter.triggerId != null) {
    filtered = filtered.filter(f => f.triggerId === filter.triggerId);
  }
  if(filter.actionType != null) {
    filtered = filtered.filter(f => f.actionType === filter.actionType);
  }

  return filtered;
};

export const cutscenesSelector: CutscenesSelector = (store, filter) => {
  const scenes = store.demo.cutscenes;

  if(!filter) return scenes;

  // TODO: reimplement as loop through filter keys, look for matching props & values.
  let filtered = scenes;
  if(filter.watched != null) {
    filtered = filtered.filter(f => f.watched === filter.watched);
  }

  return filtered;
};

export const profileSelector: ProfileSelector = store => {
    const profile = store.demo.profile;

    return profile;
};
