import * as React from "react";
import { LinkContainer } from "react-router-bootstrap";

import LoadingBar from "../../../components/layout/LoadingBar";
import { Form, Props as FormProps } from "./_Form";

import { DataStatus } from "../../../store/shared";
import { Cutscene, CutsceneCategory, Dialogue, Trigger, TriggerType, Position, createRequest } from "../../../store/admin/cutscenes";
import { Character } from "../../../store/admin/characters";

interface Props {
  status: DataStatus,
  characters: Character[],
  errors?: string,
  onSave: typeof createRequest,
}


const dialogueTemplate : Dialogue = {
  characterId: "",
  imageUrl: "",
  speaker: "",
  position: Position.CENTER,
  text:[""]
};
const triggerTemplate : Trigger = {
  type: TriggerType.NONE
};
const sceneTemplate : Cutscene = {
  id: "New",
  name: "",
  category: CutsceneCategory.DEMO,
  description: "",
  dialogue: [{ ...dialogueTemplate }],
  trigger: { ...triggerTemplate },
  created: 0,
  lastUpdated: 0
};

const getTemplate: () => Cutscene = () => {
  const dialogue = { dialogue: [{ ...dialogueTemplate }] };
  return { ...sceneTemplate, ...dialogue };
};

export const Add: React.SFC<Props> = ({ status, ...rest }) => {
  const loading = status === DataStatus.LOADING;
  const data = getTemplate();

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

          {!loading && (
            renderScene({data, status, ...rest})
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderScene: React.SFC<FormProps> = ({data, status, characters, onSave}) => {
  return (
    <React.Fragment>
      <Form data={data} status={status} characters={characters} onSave={onSave} />
    </React.Fragment>
  );
};
