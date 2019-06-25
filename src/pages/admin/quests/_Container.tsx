import * as React from "react";
import { Redirect } from "react-router-dom";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DataStatus } from "../../../store/shared";
import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/admin/quests";

interface PropsFromState {
  data: Store.Quest[],
  status: DataStatus,
  errors?: string,
  redirectAfterSave?: boolean
}
interface PropsFromDispatch {
  fetchRequest: typeof Store.fetchRequest,
  createRequest: typeof Store.createRequest,
  updateRequest: typeof Store.updateRequest,
  deleteRequest: typeof Store.deleteRequest,
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch;

interface OtherProps {
 children: (props: ContainerProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

interface State {
  status: DataStatus,
  wasSaving: boolean
}

class Container extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    const { status } = props;
    const wasSaving = false;

    this.state = { status, wasSaving };
  }

  public componentDidMount() {
    const { status } = this.state;

    if (status === DataStatus.PENDING) {
      this.props.fetchRequest();
    }
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    const status = nextProps.status;
    const priorStatus = this.state.status;

    const isSaving = this.isSavingStatus(status);
    const wasSaving = this.isSavingStatus(priorStatus);

    if(status !== priorStatus || isSaving !== wasSaving) {
      const newState = { status, wasSaving };
      this.setState(newState);
    }
  }
  private isSavingStatus = (status: DataStatus) : boolean => {
    return status === DataStatus.SAVING
        || status === DataStatus.DELETING;
  }
  private shouldRedirect = () : boolean => {
    const hasStoreError = !!this.props.errors;
    const performRedirect = this.props.redirectAfterSave || false;
    const { wasSaving } = this.state;

    return wasSaving && !hasStoreError && performRedirect;
  }

  public render() {
    const shouldRedirect = this.shouldRedirect();

    if(shouldRedirect) {
      return (
        <Redirect
          to="../quests"
          />
      );
    }

    const { children, ...rest } = this.props;
    return children({ ...rest });
  }
}

const mapStateToProps = ({ quests }: ApplicationState) => ({
  data: quests.data,
  status: quests.status,
  errors: quests.errors
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

const connectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export {
  connectedContainer as Container
};
