import * as React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import {HomePage} from "./HomePage";
import {ProfilePage} from "./ProfilePage";
import {DailyQuestsPage} from "./DailyQuestsPage";

import {NotFound} from "../errors";

export const DemoRoutes: React.SFC<RouteComponentProps<{}>> = ({match}) => {
  return (
    <Switch>
      <Route exact path={match.path} component={HomePage} />
      <Route exact path={match.path + "/profile"} component={ProfilePage} />
      <Route exact path={match.path + "/daily"} component={DailyQuestsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
};
