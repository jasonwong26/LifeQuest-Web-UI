import * as React from "react";
import Page from "../../components/layout/Page";
import {ListGroup, ListGroupItem} from "../../components/layout";

export default () => (
  <Page>
    <h2>Upcoming Features</h2>
    <ListGroup>
      <ListGroupItem>Public Blog</ListGroupItem>
      <ListGroupItem>Formatted Content via Markdown</ListGroupItem>
      <ListGroupItem>User Authentication</ListGroupItem>
      <ListGroupItem>Content Managemnt tools</ListGroupItem>
    </ListGroup>
  </Page>
);
