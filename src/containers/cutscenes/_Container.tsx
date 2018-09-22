import * as React from "react";

import * as Store from "../../store/admin/cutscenes";

interface PropsFromParent {
  scene: Store.Cutscene,
  onClose: () => void
}
interface ManagedProps {
  sceneContainer: React.Ref<HTMLDivElement>,
  title: string,
  imageUrl: string,
  speaker: string,
  text: string,
  moveNext: () => void
}
export type ContainerProps = PropsFromParent & ManagedProps;

interface OtherProps {
 children: (props: ContainerProps) => React.ReactNode
}

type AllProps = PropsFromParent & OtherProps;

interface State {
  id: string,
  sceneQueue: Store.Dialogue[],
  textQueue: string[]
}

export class Container extends React.Component<AllProps, State> {
  sceneContainer: React.RefObject<HTMLDivElement>;

  constructor(props: AllProps) {
    super(props);

    const { scene } = props;
    const model = this.mapToStateModel(scene);

    this.state = model;
    this.sceneContainer = React.createRef();
  }

  public componentDidMount() {
    this.autoFocus();
  }

  public componentDidUpdate() {
    this.autoFocus();
  }
  private autoFocus = () => {
    const node = this.sceneContainer.current;

    if(node) {
      node.focus();
    }
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    const { scene } = nextProps;

    if(scene.id === this.state.id) {
      return;
    }

    const model = this.mapToStateModel(scene);
    this.setState(model);
  }
  private mapToStateModel(data: Store.Cutscene) {
    const firstScene = data.dialogue[0];

    return {
      id: data.id,
      sceneQueue: [...data.dialogue],
      textQueue: [...firstScene.text]
    } as State;
  }

  private moveNext = () => {
    const sceneQueue = [...this.state.sceneQueue];
    let textQueue = [...this.state.textQueue];

    if (textQueue.length === 1 && sceneQueue.length === 1) {
      this.props.onClose();
    } else if (textQueue.length === 1) {
      sceneQueue.shift();
      textQueue = sceneQueue[0].text;
    } else {
      textQueue.shift();
    }

    this.setState({
      sceneQueue,
      textQueue
    });
  }

  public render() {
    const { children, scene, ...rest } = this.props;
    const { sceneQueue, textQueue } = this.state;

    const managed = {
      sceneContainer: this.sceneContainer,
      title: scene.name,
      imageUrl: sceneQueue[0].imageUrl,
      speaker: sceneQueue[0].speaker,
      text: textQueue[0],
      moveNext: this.moveNext
    } as ManagedProps;

    return children({ scene, ...rest, ...managed });
  }
}
