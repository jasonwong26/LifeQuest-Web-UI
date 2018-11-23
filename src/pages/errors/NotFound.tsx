import * as React from "react";
import Page from "../../components/layout/Page";
import { NotFound } from "../../components/errors";

const NotFoundPage = () => (
  <Page>
    <NotFound />
  </Page>
);

export { NotFoundPage as NotFound };
