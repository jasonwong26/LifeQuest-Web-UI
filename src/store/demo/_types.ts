import { PayloadAction } from "../shared/_types";

export type PayloadAction<T> = PayloadAction<T>;

/* App Settings */
export interface AppSettings {
  activePages: AppPages,
  demoState: number,
  dailyQuestQueue: string[],
  activeQuestQueue: string[],
  playCutSceneQueue: string[]
}
export enum AppPages {
  None        =  0,
  Home        =  1,
  Profile     =  2,
  DailyQuests =  4,
  YourQuests  =  8,
  Cutscenes   = 16,
  History     = 32,
  Feedback    = 64
}

/* Demo Settings */
export interface DemoContent {
  stages: DemoStage[]
  initialProfile: Profile
}
export interface DemoStage {
  activePages: AppPages,
  quests: Quest[],
  cutscenes: Cutscene[],
  events: EventListener[]
}

/* Quest Pages */
export interface Quest {
  id: string,
  title: string,
  description: string,
  instructions?: string,
  flavorText: string,
  experience: number,
  rewardPoints: number,
  repeatable: boolean,
  active: boolean,
  dailyEnabled: boolean,
  timesCompleted: number,
  lastCompleted?: number
}

/* Cutscene Player */
export interface Cutscene {
  id: string,
  title: string,
  dialogue: Dialogue[],
  visible: boolean,
  watched: boolean
}
export interface Dialogue {
  imageUrl: string
  position: ImagePosition
  speaker: string,
  text: string[]
}
export enum ImagePosition {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}

/* Event Listeners */
export interface EventListener {
  id: string,
  triggerType: TriggerType,
  triggerId?: TriggerIdType
  actionType: ActionType,
  actionId?: ActionIdType
  active: boolean,
  occurredAt?: number
}
export enum TriggerType {
  IMMEDIATE = "@@eventTriggers/IMMEDIATE",
  PAGE_ACTIVE = "@@eventTriggers/PAGE_ACTIVE",
  QUEST_COMPLETED = "@@eventTriggers/QUEST_COMPLETED",
  LEVEL_REACHED = "@@eventTriggers/LEVEL_REACHED",
  REWARD_AVAILABLE = "@@eventTriggers/REWARD_AVAILABLE",
  REWARD_REDEEMED = "@@eventTriggers/REWARD_REDEEMED",
  CUTSCENE_WATCHED = "@@eventTriggers/CUTSCENE_WATCHED"
}
export enum ActionType {
  PLAY_CUTSCENE = "@@eventActions/PLAY_CUTSCENE",
  NEXT_STAGE = "@@eventActions/NEXT_STAGE"
}
export type TriggerIdType = string | number | AppPages;
export type ActionIdType = string | number;

/* Profile Page */
export interface Profile {
  level: number,
  experience: number,
  nextLevelExp?: number,
  rewardPoints: number,
  rewards: Reward[]
}
export interface Reward {
  id: string,
  title: string,
  description: string,
  cost: number,
  timesRedeemed: number
}

/* History Page */
export interface LogEvent {
  type: LogEventTypes,
  text: string
  occurredAt: number
}
export enum LogEventTypes {
  QUEST_UNLOCKED = "@@logevent/QUEST_UNLOCKED",
  QUEST_STARTED = "@@logevent/QUEST_STARTED",
  QUEST_COMPLETED = "@@logevent/QUEST_COMPLETED",
  QUEST_DROPPED = "@@logevent/QUEST_DROPPED",
  CUTSCENE_UNLOCKED = "@@logevent/CUTSCENE_UNLOCKED",
  CUTSCENE_WATCHED = "@@logevent/CUTSCENE_WATCHED",
  CUTSCENE_SKIPPED = "@@logevent/CUTSCENE_SKIPPED",
  REWARD_AVAILABLE = "@@logevent/REWARD_AVAILABLE",
  REWARD_REDEEMED = "@@logevent/REWARD_REDEEMED",
  DEMO_STATE = "@@logevent/DEMO_STATE"
}

export enum DemoActions {
  INITIALIZE = "@@demo/INITIALIZE",
  NEXT_STAGE = "@@demo/NEXT_STAGE",
  QUEUE_CUTSCENE = "@@demo/QUEUE_CUTSCENE",
  FINISH_CUTSCENE = "@@demo/FINISH_CUTSCENE",
  SKIP_CUTSCENE = "@@demo/SKIP_CUTSCENE",
  REFRESH_DAILYQUESTS = "@@demo/REFRESH_DAILYQUESTS",
  ACTIVATE_QUEST = "@@demo/ACTIVATE_QUEST",
  COMPLETE_QUEST = "@@demo/COMPLETE_QUEST",
  DROP_QUEST = "@@demo/DROP_QUEST",
  REDEEM_REWARD = "@@demo/REDEEM_REWARD"
}
