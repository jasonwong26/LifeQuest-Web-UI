import * as React from "react";

import {Props, SideBar} from "../navigation/SideBar";

interface OtherProps {
  children: React.ReactNode
}

type AllProps = Props & OtherProps;

// TODO: determine if this is even needed?
// export type Props = Props;
export const SideBarLayout: React.SFC<AllProps> = ({ children, ...rest }) => (
  <div className="sidebar-wrapper">
    <SideBar {...rest} />
    <div
        id="content"
        className="col-sm-12">
        {children}
    </div>
  </div>
);
