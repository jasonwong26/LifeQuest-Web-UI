import { Reducer } from "redux";
import { AppPages, AppSettings, Cutscene, Quest } from "../_types";
import { DemoAppActions } from "./_types";

export const initialState: AppSettings = {
  activePages: AppPages.None,
  demoState: -1,
  dailyQuestQueue: [],
  activeQuestQueue: [],
  playCutSceneQueue: []
};

export const reducer: Reducer<AppSettings> = (state = initialState, action) => {
  switch (action.type) {
    case DemoAppActions.INIT_SUCCESS:
    case DemoAppActions.LOAD_STAGE_SUCCESS: {
      return action.payload;
    }

    case DemoAppActions.QUEUE_CUTSCENE: {
      const newScene: Cutscene = action.payload;
      const scenes = [...state.playCutSceneQueue, newScene.id];
      return {...state, playCutSceneQueue: scenes };
    }

    case DemoAppActions.DEQUEUE_CUTSCENE: {
      const scene: Cutscene = action.payload;
      const remainingScenes = state.playCutSceneQueue.filter(q => q !== scene.id);
      return {...state, playCutSceneQueue: remainingScenes };
    }

    case DemoAppActions.QUEUE_DAILYQUEST: {
      const newQuest: Quest = action.payload;
      const quests = [...state.dailyQuestQueue, newQuest.id];
      return {...state, dailyQuestQueue: quests };
    }

    case DemoAppActions.DEQUEUE_DAILYQUEST: {
      const quest: Quest = action.payload;
      const remaining = state.dailyQuestQueue.filter(q => q !== quest.id);
      return {...state, dailyQuestQueue: remaining };
    }

    case DemoAppActions.QUEUE_ACTIVEQUEST: {
      const newQuest: Quest = action.payload;
      const quests = [...state.activeQuestQueue, newQuest.id];
      return {...state, activeQuestQueue: quests };
    }

    case DemoAppActions.DEQUEUE_ACTIVEQUEST: {
      const quest: Quest = action.payload;
      const remaining = state.activeQuestQueue.filter(q => q !== quest.id);
      return {...state, activeQuestQueue: remaining };
    }

    default: {
      return state;
    }
  }
};
