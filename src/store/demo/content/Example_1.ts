
import { AppPages, DemoContent, ImagePosition, TriggerType, ActionType } from "../_types";

const noActivePages: AppPages = AppPages.None;
const stage1Pages: AppPages = AppPages.Home + AppPages.DailyQuests;
// const stage2Pages: AppPages = stage1Pages + AppPages.Profile;

export const example: DemoContent = {
  initialProfile: {
    level: 1,
    experience: 0,
    nextLevelExp: undefined,
    rewardPoints: 0,
    rewards: []
  },
  stages: [
  /* Stage 0 - Introduction */
  {
    activePages: noActivePages,
    quests: [],
    cutscenes: [{
      id: "Stage0-Intro",
      title: "A Surprise Welcome",
      visible: false,
      watched: false,
      dialogue: [{
        imageUrl: "/assets/characters/anonymous-user.png",
        position: ImagePosition.CENTER,
        speaker: "???",
        text: ["... ... ... Oh!",
          "...Just a minute!  I wasn't expecting you so soon!"]
      },
      {
        imageUrl: "/assets/characters/developer-mouse.jpg",
        position: ImagePosition.CENTER,
        speaker: "???",
        text: [
          "Right then.  A proper welcome. Hello you! Let me introduce myself, I'm Developer Mouse."
        ]
      },
      {
        imageUrl: "/assets/characters/developer-mouse.jpg",
        position: ImagePosition.CENTER,
        speaker: "Developer Mouse",
        text: [
          "And this is my website.  Or at least it will be.  Hang on, let me turn the lights on.  I was in the back tweaking something.  Just a moment!",
          "*banging sounds*",
          "*more banging sounds*",
          "There we go!  I've added a navbar and and the 'Daily Quests' page for you.  Uh, just give it a second.  It'll definitely show up soon!",
          "Why don't you pop over to the new page and I'll meet you there."
        ]
      }]
    }],
    events: [
    {
      id: "Intro-Welcome-Cutscene",
      triggerType: TriggerType.IMMEDIATE,
      actionType: ActionType.PLAY_CUTSCENE,
      actionId: "Stage0-Intro",
      active: true
    },
    {
      id: "Intro-Move-Next",
      triggerType: TriggerType.CUTSCENE_WATCHED,
      triggerId: "Stage0-Intro",
      actionType: ActionType.NEXT_STAGE,
      active: true
    }]
  },
  /* Stage 1 - First Quest */
  {
    activePages: stage1Pages,
    quests: [{
      id: "Stage1-FirstQuest",
      title: "First Steps",
      description: "click the button below to accept this quest",
      instructions: "Nice! You accepted the quest. That's all there is to this one, so go ahead and mark it complete!",
      flavorText: "It can't be this easy, right?  (No, really, it is!)",
      dailyEnabled: true,
      repeatable: false,
      active: false,
      experience: 1,
      rewardPoints: 5,
      timesCompleted: 0
    }],
    cutscenes: [{
      id: "Stage1-DailyQuestsPage",
      title: "First Steps",
      visible: false,
      watched: false,
      dialogue: [{
        imageUrl: "/assets/characters/developer-mouse.jpg",
        position: ImagePosition.CENTER,
        speaker: "Developer Mouse",
        text: [
          "Hey, great! You made it.  Glad to have you!  Let me explain a bit about my site.",
          "I wanted to make a ToDo List app, but have some fun with it.  Which is why I'm talking to you right now.  Neat right?",
          "Anyway, this is the core feature of the site.  Every day, you can come back to this page and pick a quest to complete.",
          "If you do, you'll get points you can redeem for rewards, and even gain experience and levels!",
          "So why don't you give it a try?  I've set you up with just one to get started.  Let's see if you can finish it!"
        ]
      }]
    }, {
      id: "Demo-End",
      title: "All Done (for now)",
      visible: false,
      watched: false,
      dialogue: [{
        imageUrl: "/assets/characters/developer-mouse.jpg",
        position: ImagePosition.CENTER,
        speaker: "Developer Mouse",
        text: [
          "Awesome!  Nice job.",
          "Well, that's all I have available for you to play with so far.  But stay tuned!  If you check back in a few weeks odds are I'll loads more for you to check out.",
          "Just check out my blog so you can see the latest news and updates!"
        ]
      }]
    }],
    events: [{
      id: "Stage1-DailyQuestsPage",
      triggerType: TriggerType.PAGE_ACTIVE,
      triggerId: AppPages.DailyQuests,
      actionType: ActionType.PLAY_CUTSCENE,
      actionId: "Stage1-DailyQuestsPage",
      active: true
    },
    {
      id: "Demo-End",
      triggerType: TriggerType.QUEST_COMPLETED,
      triggerId: "Stage1-FirstQuest",
      actionType: ActionType.PLAY_CUTSCENE,
      actionId: "Demo-End",
      active: true
    }]
  }]
};
