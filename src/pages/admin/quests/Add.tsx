import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, Props as FormProps } from "./_Form";

import { DataStatus } from "../../../store/shared";
import * as Store from "../../../store/admin/quests";

interface Props {
  status: DataStatus,
  errors?: string,
  onSave: typeof Store.createRequest
}

const recurrenceTemplate : Store.RecurrencePattern = {
  frequency: Store.Frequency.None
};

const questTemplate : Store.Quest = {
  id: "NEW",
  name: "",
  instructions: "",
  experience: 10,
  rewardPoints: 1,
  recurrence: { ...recurrenceTemplate }
};

const getTemplate: () => Store.Quest = () => {
  return { ...questTemplate };
};

export const Add: React.SFC<Props> = ({ status, ...rest }) => {
  const loading = status === DataStatus.LOADING;
  const data = getTemplate();

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
const renderQuest: React.SFC<FormProps> = props => {
  return (
    <React.Fragment>
      <Form {...props} />
    </React.Fragment>
  );
};
