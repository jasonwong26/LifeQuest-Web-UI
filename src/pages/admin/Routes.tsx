import * as React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import HomePage from "./Home";
import {CharacterRoutes} from "./characters";
import {CutsceneRoutes} from "./cutscenes";
import {QuestRoutes} from "./quests";

import {NotFound} from "../errors";

class AdminPage extends React.Component<RouteComponentProps<{}>> {
  public render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path} component={HomePage} />
        <Route path={match.path + "/characters"} component={CharacterRoutes} />
        <Route path={match.path + "/cutscenes"} component={CutsceneRoutes} />
        <Route path={match.path + "/quests"} component={QuestRoutes} />

        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default AdminPage;
