import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, FormProps } from "./Form";

import { Character, updateRequest } from "../../../store/admin/characters";

// Separate state props + dispatch props to their own interfaces.
interface Props {
  loading: boolean,
  saving: boolean,
  deleting: boolean,
  data?: Character,
  save: typeof updateRequest
}

const Edit: React.SFC<Props> = ({ loading, saving, deleting, data, save }) => {
  return (
    <React.Fragment>
      <div>
        <LinkContainer to="../characters">
          <button className="btn btn-default" type="button">Back</button>
        </LinkContainer>
      </div>

      <div className="row gutter-top">
        <div className="col-sm-12">
          <LoadingBar loading={loading} />

          {!loading && data && (
            renderCharacter({data, saving, deleting, save})
          )}
          {!loading && !data && (
            <div className="alert alert-danger">Specified character not found...</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCharacter: React.SFC<FormProps> = ({ data, saving, deleting, save }) => {
  const created = new Date(data.created);
  const changed = new Date(data.lastUpdated);

  return (
    <React.Fragment>
      <Form data={data} saving={saving} deleting={deleting} save={save} />

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
