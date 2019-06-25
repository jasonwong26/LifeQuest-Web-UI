import * as React from "react";

interface Props {
  text: string,
  shouldAnimate: boolean,
  animationSpeed: number
  animationEnd: () => void
}

interface State {
  index: number
  length: number
}

export class TextRunner extends React.Component<Props, State> {
  interval?: NodeJS.Timer;

  constructor(props: Props) {
    super(props);

    this.state = this.mapToState(props);
  }
  mapToState: (props: Props) => State = props => {
    const { text, shouldAnimate } = props;
    const length = text.length;
    const index = shouldAnimate ? 1 : length;
    const state = {
      index,
      length
    };

    return state;
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.text === nextProps.text &&
        this.props.shouldAnimate === nextProps.shouldAnimate) {
      return;
    }

    const newState = this.mapToState(nextProps);
    this.setState(newState, this.animate);
  }

  animate: () => void = () => {
    const { shouldAnimate, animationSpeed } = this.props;
    if(!shouldAnimate) return;
    this.interval = setInterval(this.tick, animationSpeed);
  }
  deAnimate: () => void = () => {
    if(!this.interval) return;
    clearInterval(this.interval);

    this.setState(prevState => {
      const { length } = prevState;
      return { index: length };
    });

    this.props.animationEnd();
  }
  tick: () => void = () => {
    const { index, length } = this.state;
    if(index < length) {
      this.setState(prevState => {
        const state = { ...prevState };
        state.index++;
        return state;
      });
    } else {
      this.deAnimate();
    }
  }

  componentDidMount() {
    this.animate();
  }
  componentWillUnmount() {
    this.deAnimate();
  }

  public render() {
    const { text: fullText } = this.props;
    const { index } = this.state;

    const text = fullText.substring(0, index);
    return (<React.Fragment>{text}</React.Fragment>);
  }
}
