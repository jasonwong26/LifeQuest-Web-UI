import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Route, Switch } from "react-router-dom";

import NotFoundPage from "../../pages/NotFound";
import HomePage from "./Home";

import CharactersPage from "./characters";

import { ApplicationState, ConnectedReduxProps } from "../../store/root";
import { Character } from "../../store/admin/characters/_types";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Character[]
  errors: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps;

class AdminPage extends React.Component<AllProps> {
  public render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path} component={HomePage} />

        <Route exact path={match.path + "/characters"} component={CharactersPage} />
        <Route exact path={match.path + "/characters/create"} component={CharactersPage} />
        <Route path={match.path + "/characters/:id"} component={CharactersPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ characters }: ApplicationState) => ({
  loading: characters.loading,
  errors: characters.errors,
  data: characters.data
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(AdminPage);
