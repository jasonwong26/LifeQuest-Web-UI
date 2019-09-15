import * as React from "react";

import {Props, SideBar} from "../navigation/SideBar";
import {Footer} from "../navigation/Footer";

interface OtherProps {
  children: React.ReactNode
}

type AllProps = Props & OtherProps;

interface State {
  isMobile: boolean,
  height: number,
  width: number
}

export class SideBarLayout extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = this.getStateFromWindow();
  }
  getStateFromWindow: () => State = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const isMobile = width <= 768;

    return { isMobile, height, width };
  }

  componentWillMount() {
    window.addEventListener("resize", this.refreshStateFromWindow);
  }
  refreshStateFromWindow = () => {
    const newState = this.getStateFromWindow();
    this.setState(newState);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.refreshStateFromWindow);
  }
  
  public render() {
    const { isMobile } = this.state;

    return isMobile
      ? this.renderAsFooter()
      : this.renderAsSideBar();
  }
  renderAsFooter = () => {
    const { children, ...rest } = this.props;

    return (
      <div>
        <div
            id="content"
            className="col-sm-12 navbar-bottom">
            {children}
        </div>
        <Footer {...rest} />
      </div>);    
  }
  renderAsSideBar = () => {
    const { children, ...rest } = this.props;

    return (
    <div className="sidebar-wrapper">
      <SideBar {...rest} />
      <div
          id="content"
          className="col-sm-12">
          {children}
      </div>
    </div>);
  }
}
