import * as React from "react";

interface Props {
  text: string,
  displayDelay: number
}

interface State {
  class: string
}

export class BlinkFooter extends React.Component<Props, State> {
  delayedAction?: NodeJS.Timer;

  constructor(props: Props) {
    super(props);

    this.state = { class: "invisible" };
  }

  componentDidMount() {
    const { displayDelay } = this.props;
    this.delayedAction = setTimeout(() => {
      this.setState({ class: "blink" });
    }, displayDelay);
  }

  componentWillUnmount() {
    clearTimeout(this.delayedAction!);
  }

  public render() {
    const { text } = this.props;
    const { class: className } = this.state;

    return (
      <span className={className}>{text}</span>
    );
  }
}
