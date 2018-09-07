import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";

import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import Page from "../../../components/layout/Page";
import List from "./List";
import Edit from "./Edit";

import { ApplicationState, ConnectedReduxProps } from "../../../store/root";
import { Character, fetchRequest, updateRequest } from "../../../store/admin/characters";


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean,
  saving: boolean,
  deleting: boolean,
  data: Character[]
  errors: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest,
  updateRequest: typeof updateRequest
}

interface RouteParams {
  id: string
}


// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps;

class CharactersPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { loading, data } = this.props;

    if (!loading && !data || data.length === 0) {
      this.props.fetchRequest();
    }
  }

  public render() {
    const { data, loading, saving, deleting, match } = this.props;
    const specified = !!match.params.id;
    const selected = data.find(character => character.id === match.params.id);

    return (
      <Page>
        { !specified && (
          <List loading={loading} data={data} />
        )}
        { specified && (
          <Edit loading={loading} saving={saving} deleting={deleting} data={selected} save={this.props.updateRequest} />
        )}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  const actions = {
    fetchRequest,
    updateRequest
  };

  return bindActionCreators(actions, dispatch);
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersPage);
