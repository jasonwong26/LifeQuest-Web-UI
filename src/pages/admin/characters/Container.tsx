import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/admin/characters";

interface PropsFromState {
  loading: boolean,
  saving: boolean,
  deleting: boolean,
  data: Store.Character[]
  errors: string
}
interface PropsFromDispatch {
  fetchRequest: typeof Store.fetchRequest,
  createRequest: typeof Store.createRequest,
  updateRequest: typeof Store.updateRequest,
  deleteRequest: typeof Store.deleteRequest
}
interface PropsFromParent {
  onSave?: () => void,
  onDelete?: () => void
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch &
                      PropsFromParent;

interface OtherProps {
 children: (props: ContainerProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

interface State {
  saving: boolean,
  deleting: boolean
}

class Container extends React.Component<AllProps, State> {
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
    this.navAfterDelete(newState);

    this.setState(newState);
  }
  private navAfterSave(newState: State) {
    const wasSaving = this.state.saving;
    const isSaving = newState.saving;
    const onSave = this.props.onSave;

    if(wasSaving && !isSaving && onSave) {
      onSave();
    }
  }
  private navAfterDelete(newState: State) {
    const wasDeleting = this.state.deleting;
    const isDeleting = newState.deleting;
    const onDelete = this.props.onDelete;

    if(wasDeleting && !isDeleting && onDelete) {
      onDelete();
    }
  }

  public render() {
    const { children, ...rest } = this.props;
    return children({ ...rest });
  }
}

const mapStateToProps = ({ characters }: ApplicationState) => ({
  loading: characters.loading,
  saving: characters.saving,
  deleting: characters.deleting,
  errors: characters.errors,
  data: characters.data
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { fetchRequest, createRequest, updateRequest, deleteRequest } = Store;
  const actions = {
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
