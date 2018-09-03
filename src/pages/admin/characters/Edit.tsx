import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Page from "../../../components/layout/Page";
import LoadingBar from "../../../components/layout/LoadingBar";

import { ApplicationState, ConnectedReduxProps } from "../../../store/root";
import { Character, fetchRequest } from "../../../store/admin/characters";

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Character[]
  errors: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

interface RouteParams {
  id: string
}

interface State {
  selected?: Character
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps;

class CharactersEditPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      selected: undefined
    };
  }

  public componentDidMount() {
    const { data } = this.props;

    if (!data || data.length === 0) {
      this.props.fetchRequest();
    }
  }

  public render() {
    const { data, loading, match } = this.props;
    const selected = data.find(character => character.id === match.params.id);

    return (
      <Page>
        <div>
          <LinkContainer to="../characters">
            <Button>Back</Button>
          </LinkContainer>
        </div>
        <div>
          <LoadingBar loading={loading} />
          {!loading && selected && (
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <h3>{selected.name}</h3>
                  <p>
                    {selected.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Page>
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

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersEditPage);
