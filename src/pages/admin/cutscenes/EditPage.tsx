import * as React from "react";
import { RouteComponentProps } from "react-router";

import Page from "../../../components/layout/Page";
import {Container} from "./_Container";
import {Edit} from "./Edit";

interface RouteParams {
  id: string
}

export const EditPage: React.SFC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const routeId = match.params.id;

  return (
    <Page>
      <Container>
        {
          ({ cutscenes, characters, updateRequest, deleteRequest }) => {
            const { data, status, errors } = cutscenes;
            const selected = data.find(scene => scene.id === routeId);

            return (
              <Edit
                data={selected}
                status={status}
                errors={errors}
                characters={characters.data}
                onSave={updateRequest}
                onDelete={deleteRequest}
              />
            );
          }
        }
      </Container>
    </Page>
  );
};
