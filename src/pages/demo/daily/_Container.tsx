import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/demo";

interface PropsFromState {
  dailyQuests: Store.Quest[]
}
interface PropsFromDispatch {
  activateQuest: typeof Store.activateQuest
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
  const quests = demo.quests;
  const dailyQueue = demo.app.dailyQuestQueue;

  const state: PropsFromState = {
    dailyQuests: dailyQueue.map(d => quests.find(q => q.id === d)!)
  };
  return state;
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  const { activateQuest } = Store;
  const actions = {
    activateQuest
  };

  return bindActionCreators(actions, dispatch);
};
const connected = connect(mapStateToProps, mapDispatchToProps)(Container);

export {
  connected as Container
};
