import * as React from "react";

import Page from "../../../components/layout/Page";
import {Container} from "./_Container";
import {List} from "./List";

export const ListPage: React.SFC = () => {
  return (
    <Page>
      <Container>
        {({ status, data }) => (
          <List
            status={status}
            data={data} />
          )}
      </Container>
    </Page>
  );
};
