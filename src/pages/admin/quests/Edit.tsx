import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, Props as FormProps } from "./_Form";

import { DataStatus } from "../../../store/shared";
import * as Store from "../../../store/admin/quests";

interface Props {
  data?: Store.Quest,
  status: DataStatus,
  errors?: string,
  onSave: typeof Store.updateRequest,
  onDelete?: typeof Store.deleteRequest
}

export const Edit: React.SFC<Props> = ({ status, data, ...rest }) => {
  const loading = status === DataStatus.LOADING;

  return (
    <React.Fragment>
      <div>
        <LinkContainer to="../quests">
          <a
            href="../quests"
            className="btn btn-default" >
            Back
          </a>
        </LinkContainer>
      </div>

      <div className="row gutter-top">
        <div className="col-sm-12">
          <LoadingBar loading={loading} />

          {!loading && !data && (
            <div className="alert alert-danger">Specified quest not found...</div>
          )}

          {!loading && data && (
            renderQuest({data, status, ...rest})
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
const renderQuest: React.SFC<FormProps> = ({ data, ...rest }) => {
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
