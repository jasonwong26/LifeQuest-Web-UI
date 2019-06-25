import * as React from "react";
import {DemoPage} from "./DemoPage";
import {DailyQuests} from "./daily";

import {AppPages} from "../../store/demo";

export const DailyQuestsPage: React.SFC = () => (
  <DemoPage appPage={AppPages.DailyQuests}>
    <h2>Daily Quests</h2>
    <DailyQuests />
  </DemoPage>
);
