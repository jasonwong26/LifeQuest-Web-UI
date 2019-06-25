import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "../../../store/root";
import * as Store from "../../../store/demo";

interface PropsFromState {
  activeQuests: Store.Quest[]
}
interface PropsFromDispatch {
  completeQuest: typeof Store.completeQuest
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
  const activeQueue = demo.app.activeQuestQueue;

  const state: PropsFromState = {
    activeQuests: activeQueue.map(d => quests.find(q => q.id === d)!)
  };
  return state;
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  const { completeQuest } = Store;
  const actions = {
    completeQuest
  };

  return bindActionCreators(actions, dispatch);
};
const connected = connect(mapStateToProps, mapDispatchToProps)(Container);

export {
  connected as Container
};
