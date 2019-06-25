import * as React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Nav, NavItem} from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import {AppPages} from "../../store/demo/_types";

export interface Props {
  rootUrl?: string,
  activePages?: AppPages
}

interface InternalProps {
  rootUrl: string,
  activePages: AppPages
}

const defaultProps : InternalProps = {
  rootUrl: "",
  activePages: AppPages.Home + AppPages.Profile + AppPages.DailyQuests // tslint:disable-line
};

export const SideBar: React.SFC<Props> = (props: Props = {}) => {
  const mergedProps = {...defaultProps, ...props};
  const { rootUrl, activePages } = mergedProps;

  const isPageActive: (page: AppPages) => boolean = page => {
    return !!(activePages & page); // tslint:disable-line
  };

  return (
    <div id="sidebar">
        <Nav
            bsStyle="pills"
            stacked>

          {isPageActive(AppPages.Home) && (
            <LinkContainer to={`${rootUrl}`} exact>
              <NavItem eventKey={1}>
                <FontAwesome name="home" size="lg" className="nav-icon" />
                <span>Home</span>
              </NavItem>
            </LinkContainer>
          )}

          {isPageActive(AppPages.Profile) && (
            <LinkContainer to={`${rootUrl}/profile`}>
              <NavItem eventKey={2}>
                <FontAwesome name="user" size="lg" className="nav-icon" />
                <span>Profile</span>
              </NavItem>
            </LinkContainer>
          )}

          {isPageActive(AppPages.DailyQuests) && (
            <LinkContainer to={`${rootUrl}/daily`}>
              <NavItem eventKey={3}>
                <FontAwesome name="calendar-o" size="lg" className="nav-icon" />
                <span>Daily Quests</span>
              </NavItem>
            </LinkContainer>
          )}

          {isPageActive(AppPages.YourQuests) && (
            <LinkContainer to={`${rootUrl}/cutscenes`}>
              <NavItem eventKey={4}>
                <FontAwesome name="video-camera" size="lg" className="nav-icon" />
                <span>Cutscenes</span>
              </NavItem>
            </LinkContainer>
          )}
          {isPageActive(AppPages.History) && (
            <LinkContainer to={`${rootUrl}/history`}>
              <NavItem eventKey={4}>
                <FontAwesome name="history" size="lg" className="nav-icon" />
                <span>History</span>
              </NavItem>
            </LinkContainer>
          )}
        </Nav>
    </div>
  );
};
