import * as React from "react";

import { CutscenesModal } from "../../../containers/cutscenes/CutsceneModal";

import { Cutscene } from "../../../store/admin/cutscenes";

interface Props {
  scene: Cutscene,
  showModal: boolean
}

interface State {
  showModal: boolean
}

export class ScenePreview extends React.Component<Props, State> {
  state = {
    showModal: this.props.showModal
  };

  public componentWillReceiveProps(nextProps: Props) {
    const currentProp = this.props.showModal;
    const currentState = this.state.showModal;
    const nextProp = nextProps.showModal;

    if(!currentProp && !currentState && nextProp) {
      this.setState( { showModal: true });
    }
  }

  public dispayModal = () => {
    this.setState({ showModal: true });
  }
  public hideModal = () => {
    this.setState({ showModal: false });
  }

  public render() {
    const { scene } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        { showModal && (
          <CutscenesModal scene={scene} onClose={this.hideModal} />
        )}

        <button className="btn btn-default" onClick={this.dispayModal}>
          <span className="glyphicon glyphicon-repeat" aria-hidden="true" /> Replay
        </button>
      </div>
    );
  }
}
