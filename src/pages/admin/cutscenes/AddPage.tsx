import * as React from "react";

import Page from "../../../components/layout/Page";
import {Container} from "./_Container";
import {Add} from "./Add";

export const AddPage: React.SFC = () => {
  return (
    <Page>
      <Container>
        {
          ({ status, errors, createRequest }) => {
            return (
              <Add
                status={status}
                errors={errors}
                onSave={createRequest}
              />
            );
          }
        }
      </Container>
    </Page>
  );
};
