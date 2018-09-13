import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, Props as FormProps } from "./_Form";

import { DataStatus } from "../../../store/shared";
import { Cutscene, createRequest } from "../../../store/admin/cutscenes";

interface Props {
  status: DataStatus,
  errors?: string,
  onSave: typeof createRequest,
}

const template : Cutscene = {
  id: "New",
  name: "",
  description: "",
  dialogue: [],
  created: 0,
  lastUpdated: 0
};

const getEmptyCharacter: () => Cutscene = () => {
  return { ...template };
};

export const Add: React.SFC<Props> = ({ status, ...rest }) => {
  const loading = status === DataStatus.LOADING;
  const data = getEmptyCharacter();

  return (
    <React.Fragment>
      <div>
        <LinkContainer to="../characters">
          <a
            href="../cutscenes"
            className="btn btn-default" >
            Back
          </a>
        </LinkContainer>
      </div>

      <div className="row gutter-top">
        <div className="col-sm-12">
          <LoadingBar loading={loading} />

          {!loading && (
            renderCharacter({data, status, ...rest})
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCharacter: React.SFC<FormProps> = ({data, status, onSave}) => {
  return (
    <React.Fragment>
      <Form data={data} status={status} onSave={onSave} />
    </React.Fragment>
  );
};
