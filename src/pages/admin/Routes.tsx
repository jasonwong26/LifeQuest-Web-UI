import * as React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import NotFoundPage from "../../pages/NotFound";
import HomePage from "./Home";
import CharactersPages from "./characters";

class AdminPage extends React.Component<RouteComponentProps<{}>> {
  public render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path} component={HomePage} />
        <Route path={match.path + "/characters"} component={CharactersPages} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default AdminPage;
