import * as React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string
}

const Header: React.SFC<HeaderProps> = ({ title }) => (
  <header>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={"/"}>{title}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/admin/characters">
          <NavItem eventKey={1}>Characters</NavItem>
        </LinkContainer>
      </Nav>
      <Nav>
        <LinkContainer to="/admin/cutscenes">
          <NavItem eventKey={2}>Cutscenes</NavItem>
        </LinkContainer>
      </Nav>
      <Nav>
        <LinkContainer to="/admin/quests">
          <NavItem eventKey={3}>Quests</NavItem>
        </LinkContainer>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Header;
