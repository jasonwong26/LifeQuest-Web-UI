import * as React from "react";
import { TextRunner } from "./_TextRunner";
import { BlinkFooter } from "./_BlinkFooter";

interface Props {
  imageUrl: string,
  speaker: string,
  text: string,
  moveNext: () => void,
  settings?: Settings
}
interface Settings {
  animationSpeed: number,
  helpDisplayDelay: number,
  movementKeys: string[]
}

interface State {
  shouldAnimate: boolean,
  displayHelp: boolean
}

type FullState = Settings & State;

export class Layout extends React.Component<Props, FullState> {
  static defaultSettings: Settings = {
    animationSpeed: 50,
    helpDisplayDelay: 2000,
    movementKeys: ["Enter", " "]
  };
  static initialState: State = {
    shouldAnimate: true,
    displayHelp: false
  };

  layoutDiv: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    const settings = this.parseForSettings(props);
    const initialState = Layout.initialState;
    this.state = {
      ...settings,
      ...initialState
    };

    this.layoutDiv = React.createRef<HTMLDivElement>();
  }
  parseForSettings: (props: Props) => Settings = props => {
    const defaults = Layout.defaultSettings;
    const fromProps = props.settings || {};
    const settings = {...defaults, ...fromProps};
    return settings;
  }

  onClick = () => {
    this.handleMove();
  }
  onKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const movementKeys = this.state.movementKeys;

    if(movementKeys.indexOf(e.key) !== -1) {
      this.handleMove();
    }
  }
  handleMove = () => {
    if(this.state.shouldAnimate) {
      this.setState({shouldAnimate: false});
    } else {
      this.setState({shouldAnimate: true});
      this.props.moveNext();
    }
  }

  onAnimationEnd = () => {
    this.setState({shouldAnimate: false});
  }

  componentDidMount() {
    this.layoutDiv.current!.focus();
  }

  public render() {
    const { imageUrl, speaker, text } = this.props;
    const { shouldAnimate, animationSpeed, helpDisplayDelay } = this.state;

    return (
      <div
        ref={this.layoutDiv}
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        className="scene-container"
        tabIndex={0}>
        <img src={imageUrl} alt={speaker} className="img-responsive center-block img-rounded" />
        <h4>{speaker}</h4>
        <div className="scene-text">
          <TextRunner
            shouldAnimate={shouldAnimate}
            text={text}
            animationSpeed={animationSpeed}
            animationEnd={this.onAnimationEnd}
          />
        </div>
        <div className="text-right">
          <BlinkFooter
            text="Press [Space]"
            displayDelay={helpDisplayDelay}
            />
        </div>
      </div>
    );
  }
}
