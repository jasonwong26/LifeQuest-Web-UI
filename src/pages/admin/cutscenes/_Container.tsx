import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DataStatus } from "../../../store/shared";
import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/admin/cutscenes";

interface PropsFromState {
  data: Store.Cutscene[],
  status: DataStatus,
  errors: string
}
interface PropsFromDispatch {
  fetchRequest: typeof Store.fetchRequest,
  createRequest: typeof Store.createRequest,
  updateRequest: typeof Store.updateRequest,
  deleteRequest: typeof Store.deleteRequest
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch;

interface OtherProps {
 children: (props: ContainerProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

interface State {
  status: DataStatus
}

// TODO: rewrite to use Redirect component?

class Container extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    const { status } = props;
    this.state = {
      status
    };
  }

  public componentDidMount() {
    const { status } = this.props;

    if (status === DataStatus.PENDING) {
      this.props.fetchRequest();
    }
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    if(this.state.status === nextProps.status) {
      return;
    }

    const { status } = nextProps;
    const newState = {
      status
    };

    this.setState(newState);
  }

  public render() {
    const { children, ...rest } = this.props;
    return children({ ...rest });
  }
}

const mapStateToProps = ({ cutscenes }: ApplicationState) => ({
  data: cutscenes.data,
  status: cutscenes.status,
  errors: cutscenes.errors
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
