import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";

import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import Page from "../../../components/layout/Page";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";

import { ApplicationState, ConnectedReduxProps } from "../../../store/root";
import { Character, fetchRequest, createRequest, updateRequest, deleteRequest } from "../../../store/admin/characters";


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
  createRequest: typeof createRequest,
  updateRequest: typeof updateRequest,
  deleteRequest: typeof deleteRequest
}

interface RouteParams {
  id: string
}


// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<RouteParams> &
  RouteComponentProps<RouteParams> &
  ConnectedReduxProps;

  interface State {
    saving: boolean,
    deleting: boolean
  }

class CharactersPage extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    const { saving, deleting } = props;
    this.state = {
      saving,
      deleting
    };
  }

  public componentDidMount() {
    const { loading, data } = this.props;

    if (!loading && !data || data.length === 0) {
      this.props.fetchRequest();
    }
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    const { saving, deleting } = nextProps;
    const newState = {
      saving,
      deleting
    };
    
    this.navAfterSave(newState);
    this.setState(newState);
  }
  private navAfterSave(newState: State) {
    const propState = newState.saving || newState.deleting;
    const priorState = this.state.saving || this.state.deleting;

    if(priorState && !propState) {
      this.props.history.push("../characters");
    }
  }

  public render() {
    const { data, loading, saving, deleting, match } = this.props;
    const specified = !!match.params.id;
    const selected = data.find(character => character.id === match.params.id);
    const isNew = match.url.endsWith("/create");

    return (
      <Page>
        { !specified && !isNew && (
          <List
            loading={loading}
            data={data}/>
        )}
        { isNew && (
          <Add
            loading ={loading}
            saving={saving}
            onSave={this.props.createRequest} />
        )}
        { specified && (
          <Edit
            loading={loading}
            saving={saving}
            deleting={deleting}
            data={selected}
            onSave={this.props.updateRequest}
            onDelete={this.props.deleteRequest}
           />
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
  saving: characters.saving,
  deleting: characters.deleting,
  errors: characters.errors,
  data: characters.data
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const actions = {
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest
  };

  return bindActionCreators(actions, dispatch);
};

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersPage);
