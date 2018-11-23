import * as React from "react";
import { RouteComponentProps } from "react-router";

import Page from "../../../components/layout/Page";
import Container from "./Container";
import Edit from "./Edit";

interface RouteParams {
  id: string
}

const EditPage: React.SFC<RouteComponentProps<RouteParams>> = ({ history, match }) => {
  const routeId = match.params.id;
  const navToList = () => {
    history.push("../characters");
  };

  return (
    <Page>
      <Container onSave={navToList} onDelete={navToList}>
        {({ data, errors, loading, saving, deleting, updateRequest, deleteRequest }) => {
          const selected = data.find(character => character.id === routeId);

          return (
            <Edit
              loading={loading}
              saving={saving}
              deleting={deleting}
              data={selected}
              errors={errors}
              onSave={updateRequest}
              onDelete={deleteRequest} />
        );
      }}
      </Container>
    </Page>
  );
};

export default EditPage;
