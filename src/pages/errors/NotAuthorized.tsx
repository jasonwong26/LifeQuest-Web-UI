import * as React from "react";
import Page from "../../components/layout/Page";
import { NotAuthorized } from "../../components/errors";

const NotAuthorizedPage = () => (
  <Page>
    <NotAuthorized />
  </Page>
);

export { NotAuthorizedPage as NotAuthorized };
