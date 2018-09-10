import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, FormProps } from "./Form";

import { Character, createRequest } from "../../../store/admin/characters";

// Separate state props + dispatch props to their own interfaces.
interface Props {
  loading: boolean,
  saving: boolean,
  onSave: typeof createRequest,
}

const template : Character = {
  id: "New",
  name: "",
  description: "",
  images: [],
  created: 0,
  lastUpdated: 0
};

const getEmptyCharacter: () => Character = () => {
  return Object.assign({}, template);
};

const Add: React.SFC<Props> = ({ loading, ...rest }) => {
  const data = getEmptyCharacter();

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

          {!loading && (
            renderCharacter({data, ...rest})
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderCharacter: React.SFC<FormProps> = ({data, saving, onSave}) => {
  return (
    <React.Fragment>
      <Form data={data} saving={saving} onSave={onSave} />
    </React.Fragment>
  );
};

export default Add;
