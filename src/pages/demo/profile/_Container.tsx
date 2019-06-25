import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/demo";

interface PropsFromState {
  profile: Store.Profile
}
interface PropsFromDispatch {
  redeemReward: typeof Store.redeemReward
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch;

interface OtherProps {
  children: (props: ContainerProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

class Container extends React.Component<AllProps> {
  public render() {
    const { children, ...rest } = this.props;
    return children({ ...rest });
  }
}

const mapStateToProps = ({ demo }: ApplicationState) => {
  const profile = demo.profile;
  const state: PropsFromState = {
    profile: { ...profile }
  };
  return state;
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  const { redeemReward } = Store;
  const actions = {
    redeemReward
  };

  return bindActionCreators(actions, dispatch);
};
const connected = connect(mapStateToProps, mapDispatchToProps)(Container);

export {
  connected as Container
};
