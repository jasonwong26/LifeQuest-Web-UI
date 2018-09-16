import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DataStatus } from "../../../store/shared";
import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/admin/cutscenes";
import { Character, fetchRequest as fetchCharactersRequest } from "../../../store/admin/characters";

interface PropsFromState {
  cutscenes: {
    data: Store.Cutscene[],
    status: DataStatus,
    errors: string
  },
  characters: {
    data: Character[],
    status: DataStatus,
    errors: string
  }
}
interface PropsFromDispatch {
  fetchRequest: typeof Store.fetchRequest,
  createRequest: typeof Store.createRequest,
  updateRequest: typeof Store.updateRequest,
  deleteRequest: typeof Store.deleteRequest,

  fetchCharactersRequest: typeof fetchCharactersRequest
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch;

interface OtherProps {
 children: (props: ContainerProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

interface State {
  cutscenesStatus: DataStatus
  charactersStatus: DataStatus
}

// TODO: rewrite to use Redirect component?

class Container extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    const cutscenesStatus = props.cutscenes.status;
    const charactersStatus = props.characters.status;

    this.state = {
      cutscenesStatus,
      charactersStatus
    };
  }

  public componentDidMount() {
    const { cutscenesStatus, charactersStatus } = this.state;

    if (cutscenesStatus === DataStatus.PENDING) {
      this.props.fetchRequest();
    }

    if(charactersStatus === DataStatus.PENDING) {
      this.props.fetchCharactersRequest();
    }
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    const cutscenesStatus = nextProps.cutscenes.status;
    const charactersStatus = nextProps.characters.status;

    if(this.state.cutscenesStatus === cutscenesStatus &&
       this.state.charactersStatus === charactersStatus) {
      return;
    }

    const newState = {
      cutscenesStatus,
      charactersStatus
    };

    this.setState(newState);
  }

  public render() {
    const { children, ...rest } = this.props;
    return children({ ...rest });
  }
}

const mapStateToProps = ({ cutscenes, characters }: ApplicationState) => ({
  cutscenes: {
    data: cutscenes.data,
    status: cutscenes.status,
    errors: cutscenes.errors
  },
  characters: {
    data: characters.data,
    status: mapCharactersDataStatus(characters.loading, characters.data),
    errors: characters.errors
  }
});
const mapCharactersDataStatus = (loading: boolean, data: Character[]) => {
  let charactersStatus = DataStatus.PENDING;
  if(loading) {
    charactersStatus = DataStatus.LOADING;
  } else if (data && data.length > 0) {
    charactersStatus = DataStatus.READY;
  }

  return charactersStatus;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { fetchRequest, createRequest, updateRequest, deleteRequest } = Store;
  const actions = {
    fetchRequest,
    createRequest,
    updateRequest,
    deleteRequest,

    fetchCharactersRequest
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
