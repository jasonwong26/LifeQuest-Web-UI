import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, FormProps } from "./Form";

import { Character, updateRequest, deleteRequest } from "../../../store/admin/characters";

interface Props {
  loading: boolean,
  saving: boolean,
  deleting: boolean,
  data?: Character,
  onSave: typeof updateRequest,
  onDelete: typeof deleteRequest
}

const Edit: React.SFC<Props> = ({ loading, data, ...rest }) => {
  return (
    <React.Fragment>
      <div>
        <LinkContainer to="../characters">
          <a
            href="../characters"
            className="btn btn-default" >
            Back
          </a>
        </LinkContainer>
      </div>

      <div className="row gutter-top">
        <div className="col-sm-12">
          <LoadingBar loading={loading} />

          {!loading && data && (
            renderCharacter({data, ...rest})
          )}
          {!loading && !data && (
            <div className="alert alert-danger">Specified character not found...</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCharacter: React.SFC<FormProps> = ({ data, saving, deleting, onSave, onDelete }) => {
  const created = new Date(data.created);
  const changed = new Date(data.lastUpdated);

  return (
    <React.Fragment>
      <Form data={data} saving={saving} onSave={onSave} deleting={deleting} onDelete={onDelete} />

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

export default Edit;
