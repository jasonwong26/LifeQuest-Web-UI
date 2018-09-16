import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, Props as FormProps } from "./_Form";

import { DataStatus } from "../../../store/shared";
import { Cutscene, updateRequest, deleteRequest } from "../../../store/admin/cutscenes";
import { Character } from "../../../store/admin/characters";

interface Props {
  data?: Cutscene,
  status: DataStatus,
  characters: Character[],
  errors?: string,
  onSave: typeof updateRequest,
  onDelete?: typeof deleteRequest
}

// TODO: rewrite to use Redirect component

export const Edit: React.SFC<Props> = ({ status, data, ...rest }) => {
  const loading = status === DataStatus.LOADING;

  return (
    <React.Fragment>
      <div>
        <LinkContainer to="../cutscenes">
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

          {!loading && !data && (
            <div className="alert alert-danger">Specified cutscene not found...</div>
          )}

          {!loading && data && (
            renderCutscene({data, status, ...rest})
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCutscene: React.SFC<FormProps> = ({ data, ...rest }) => {
  const created = new Date(data.created);
  const changed = new Date(data.lastUpdated);

  return (
    <React.Fragment>
      <Form data={data} {...rest} />

      <ul className="list-inline gutter-top">
        <li>
          <strong>Created</strong>: {created.toLocaleString()}
        </li>
        <li>
          <strong>Last Modified</strong>: {changed.toLocaleString()}
        </li>
      </ul>
    </React.Fragment>
  );
};
