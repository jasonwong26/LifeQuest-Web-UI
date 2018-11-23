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
  errors?: string,
  onSave: typeof updateRequest,
  onDelete: typeof deleteRequest
}

// TODO: rewrite to use Redirect component

const Edit: React.SFC<Props> = ({ loading, data, errors, ...rest }) => {
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
            renderCharacter({data, storeError: errors, ...rest})
          )}
          {!loading && !data && (
            <div className="alert alert-danger">Specified character not found...</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCharacter: React.SFC<FormProps> = ({ data, ...rest }) => {
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

export default Edit;
