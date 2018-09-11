import * as React from "react";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import ListPage from "./ListPage";
import EditPage from "./EditPage";
import AddPage from "./AddPage";

const CharactersPages: React.SFC<RouteComponentProps<{}>> = ({match}) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ListPage} />
      <Route exact path={match.path + "/create"} component={AddPage} />
      <Route path={match.path + "/:id"} component={EditPage} />
    </Switch>
  );
};

export default CharactersPages;
