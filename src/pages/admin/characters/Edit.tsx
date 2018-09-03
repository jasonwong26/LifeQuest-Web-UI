import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import Form from "./Form";

import { Character } from "../../../store/admin/characters";

// Separate state props + dispatch props to their own interfaces.
interface Props {
  loading: boolean,
  data?: Character
}

const Edit: React.SFC<Props> = ({ loading, data }) => {
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
            renderCharacter(data)
          )}
          {!loading && !data && (
            <div className="alert alert-danger">Specified character not found...</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCharacter: React.SFC<Character> = data => {
  const created = new Date(data.created);
  const changed = new Date(data.lastUpdated);

  return (
    <div>
      <Form data={data} />

      <ul className="list-inline gutter-top">
        <li>
          <strong>Created</strong>: {created.toLocaleString()}
        </li>
        <li>
          <strong>Last Modified</strong>: {changed.toLocaleString()}
        </li>
      </ul>
    </div>
  );
};

export default Edit;
