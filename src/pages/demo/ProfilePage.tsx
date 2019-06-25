import * as React from "react";
import {DemoPage} from "./DemoPage";

import {AppPages} from "../../store/demo";

import {Profile} from "./profile";

export const ProfilePage = () => (
  <DemoPage appPage={AppPages.Profile}>
    <h2>Demo</h2>
    <Profile />
  </DemoPage>
);
