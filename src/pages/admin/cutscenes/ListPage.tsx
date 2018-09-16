import * as React from "react";

import Page from "../../../components/layout/Page";
import {Container} from "./_Container";
import {List} from "./List";

export const ListPage: React.SFC = () => {
  return (
    <Page>
      <Container>
        {({ cutscenes }) => {
          const { status, data } = cutscenes;

          return (
            <List
              status={status}
              data={data} />
            );
        }}
      </Container>
    </Page>
  );
};
