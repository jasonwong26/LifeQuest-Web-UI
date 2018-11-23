import * as React from "react";
import { RouteComponentProps } from "react-router";

import Page from "../../../components/layout/Page";
import Container from "./Container";
import Add from "./Add";

interface RouteParams {
  id: string
}

const AddPage: React.SFC<RouteComponentProps<RouteParams>> = ({ history }) => {
  const navToList = () => {
    history.push("../characters");
  };

  return (
    <Page>
      <Container onSave={navToList}>
        {({ loading, saving, errors, createRequest }) => (
            <Add
              loading={loading}
              saving={saving}
              errors={errors}
              onSave={createRequest} />
        )}
      </Container>
    </Page>
  );
};

export default AddPage;
