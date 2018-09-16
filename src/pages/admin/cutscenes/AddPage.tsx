import * as React from "react";

import Page from "../../../components/layout/Page";
import {Container} from "./_Container";
import {Add} from "./Add";

export const AddPage: React.SFC = () => {
  return (
    <Page>
      <Container>
        {
          ({ cutscenes, characters, createRequest }) => {
            const { status, errors } = cutscenes;

            return (
              <Add
                status={status}
                errors={errors}
                characters={characters.data}
                onSave={createRequest}
              />
            );
          }
        }
      </Container>
    </Page>
  );
};
