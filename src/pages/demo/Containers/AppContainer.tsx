import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ApplicationState } from "../../../store/root";
import { DataStatus } from "../../../store/shared";
import * as Store from "../../../store/demo";

interface PropsFromState {
  loading: boolean,
  data?: Store.DemoContent,
  app: Store.AppSettings,
  cutscenes: Store.Cutscene[],
  quests: Store.Quest[],
  errors?: string
}
interface PropsFromDispatch {
  initialize: typeof Store.initialize
  finishCutscene: typeof Store.finishCutscene
}
interface DerivedProps {
  activeScene?: Store.Cutscene
}
type ContainerProps = PropsFromState &
                      PropsFromDispatch &
                      DerivedProps;

interface OtherProps {
  children: (props: ContainerProps) => React.ReactNode
}

type AllProps = ContainerProps & OtherProps;

class AppContainer extends React.Component<AllProps> {
  public componentDidMount() {
    const { loading, data } = this.props;

    if (!loading && !data) {
      this.props.initialize();
    }
  }

  getActiveCutScene = () => {
    const scenes = this.props.cutscenes;
    const queue = this.props.app.playCutSceneQueue;

    if(queue.length === 0) return undefined;

    const id = queue[0];
    const scene = scenes.find(s => s.id === id);
    return scene;
  }

  public render() {
    const activeScene = this.getActiveCutScene();
    const { children, ...rest } = this.props;
    return children({ activeScene, ...rest });
  }
}

const mapStateToProps = ({ demo }: ApplicationState) => ({
  data: demo.content.data,
  app: demo.app,
  cutscenes: demo.cutscenes,
  quests: demo.quests,
  loading: demo.content.status === DataStatus.LOADING,
  errors: demo.content.errors
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const { initialize, finishCutscene } = Store;
  const actions = {
    initialize,
    finishCutscene
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
