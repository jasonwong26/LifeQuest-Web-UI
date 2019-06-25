import * as React from "react";
import {DemoPage} from "./DemoPage";

import {AppPages} from "../../store/demo";

import {Home} from "./home";

export const HomePage = () => (
  <DemoPage appPage={AppPages.Home}>
    <h2>Demo</h2>
    <Home />
  </DemoPage>
);

/*
TODO:
- DONE Implement Demo store(s)
- DONE Implement Demo initial blank page logic
- DONE Implement Cutscene player
- DONE Implement Cutscene listener Container
- DONE Implement Event Listener(s)
- DONE Implement next stage actions
- DONE Test playing opening cutscene
- DONE Test moving to next stage of Demo

- DONE Implement text animation in cutscene
- DONE Implement Navigation Change listener(s)
- DONE Implement Daily Quests Page
- DONE Implement Home Page

- DONE: move isPageEnabled into DemoPage logic

- TODO: expand demo content
- TODO: implement Unique IDs for Rewards
- TODO: implement Cutscene Event logic?  (How to handle if user doesn't finish the cutscene??)
*/

/* Event Workflow:

- Load Content Request
- Load Content Complete
- Initialize App (triggers each sub-initialize event)
  - @@demo/INITIALIZE
    - @@demoContent/FETCH_REQUEST => @@demoContent/FETCH_SUCCESS
      - @@demoApp/INIT_REQUEST => @@demoApp/LOAD_STAGE_SUCCESS
      - @@demoProfile/INIT_REQUEST => @@demoProfile/LOAD_STAGE_SUCCESS
      - @@demoCutscenes/INIT_REQUEST => @@demoCutscenes/LOAD_STAGE_SUCCESS
      - @@demoQuests/INIT_REQUEST => @@demoQuests/LOAD_STAGE_SUCCESS
      - @@demoEvents/INIT_REQUEST => @@demoEvents/LOAD_STAGE_SUCCESS
      - @@router/LOCATION_CHANGE

- Activate immediate event => queue initial cutscene
  - @@demoApp/LOAD_STAGE_SUCCESS
    - @@demoApp/QUEUE_CUTSCENE
    - @@demoEvents/UPDATE_EVENT

- User finishes cutscene:
  - @@demo/FINISH_CUTSCENE
    - @@DemoCutscenes/UPDATE_SCENE
    - @@demoApp/DEQUEUE_CUTSCENE

    - @@demo/LOAD_NEXT_STAGE
      - @@demoApp/LOAD_STAGE_REQUEST => @@demoApp/LOAD_STAGE_SUCCESS
      - @@demoProfile/LOAD_STAGE_REQUEST => @@demoProfile/LOAD_STAGE_SUCCESS
      - @@demoCutscenes/LOAD_STAGE_REQUEST => @@demoCutscenes/LOAD_STAGE_SUCCESS
      - @@demoQuests/LOAD_STAGE_REQUEST" => @@demoQuests/LOAD_STAGE_SUCCESS
      - @@demoEvents/LOAD_STAGE_REQUEST" => @@demoEvents/LOAD_STAGE_SUCCESS

- User accepts, then completes a Daily Quest:
  - @@demo/ACTIVATE_QUEST
    - @@demoApp/DEQUEUE_DAILY_QUEST
    - @@demoQuests/UPDATE_QUEST
    - @@demoApp/QUEUE_ACTIVE_QUEST
    - @@router/LOCATION_CHANGE
  - @@demo/COMPLETE_QUEST
    - @@demoApp/DEQUEUE_ACTIVE_QUEST
    - @@demoQuests/UPDATE_QUEST
    - @@demoProfile/ADD_QUESTREWARD
    - @@demoApp/QUEUE_CUTSCENE
    - @@DemoCutscenes/UPDATE_SCENE
    - @@demoEvents/UPDATE_EVENT
*/


/*
Bug Fixes:
 - DONE Add Prevent Default to cutscene modal keybindings
 - DONE Focus modal div on initial display
 - DONE Add Text animation to cutscene modal
 - DONE Add Help text to bottom of cutscene modal
*/

/*
Enhancements:
 - Add event that can be triggered mid-Cutscene?
*/
