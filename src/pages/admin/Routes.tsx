import * as React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import HomePage from "./Home";
import {CharacterRoutes} from "./characters";
import {CutsceneRoutes} from "./cutscenes";
import NotFoundPage from "../NotFound";

class AdminPage extends React.Component<RouteComponentProps<{}>> {
  public render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path} component={HomePage} />
        <Route path={match.path + "/characters"} component={CharacterRoutes} />
        <Route path={match.path + "/cutscenes"} component={CutsceneRoutes} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default AdminPage;
