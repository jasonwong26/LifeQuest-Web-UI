import * as React from "react";
import { Tabs, Tab } from "react-bootstrap";
import {TextInput, TextArea, SubmitButton} from "../../../components/forms";
import { DialogueForm } from "./_DialogueForm";
import { DragTest } from "./_DragTest";

import { DataStatus } from "../../../store/shared";
import { Cutscene, Dialogue, createRequest, updateRequest, deleteRequest } from "../../../store/admin/cutscenes";
import { Character } from "../../../store/admin/characters";


type saveRequest = typeof createRequest | typeof updateRequest;

export interface Props {
  data: Cutscene,
  status: DataStatus,
  errors?: string,
  characters: Character[],

  onSave: saveRequest,
  onDelete?: typeof deleteRequest
}

interface State {
  data: Cutscene,
  errors: any
}

type HTMLFormInput = HTMLInputElement | HTMLTextAreaElement;

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: props.data,
      errors: {}
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({data: Object.assign({}, nextProps.data)});
    }
  }

  public render() {
    const saving = this.props.status === DataStatus.SAVING;
    const deleting = this.props.status === DataStatus.DELETING;

    const { characters, onDelete } = this.props;
    const showDelete = !!onDelete;
    const { data, errors } = this.state;

    return (
      <form
        onSubmit={this.onSave}>
        <TextInput
           label="Name"
           name="name"
           onChange={this.onChange}
           value={data.name}
           error={errors.name} />
        <TextArea
          label="Description"
          name="description"
          onChange={this.onChange}
          value={data.description}
          error={errors.description} />

        <Tabs
          id="cutscene-form-tabs"
          >
          <Tab eventKey={1} title="Dialogue" className="gutter-top">
            {
              data.dialogue.map((dialogue, index) => (
                <React.Fragment
                  key={index}>
                  {index > 0 && (
                    <hr/>
                  )}
                  <DialogueForm
                    index={index}
                    data={dialogue}
                    characters={characters}
                    showAdd={false}
                    onChange={this.onDialogueChange}
                    />
                </React.Fragment>
              ))
            }
          </Tab>
          <Tab eventKey={2} title="Trigger" className="gutter-top">
            <div>temp value </div>
          </Tab>
          <Tab eventKey={3} title="Drag Test" className="gutter-top">
            <DragTest />
          </Tab>
        </Tabs>
        <hr/>
        <div className="form-group">
          <SubmitButton
            value={saving ? "Saving" : "Save"}
            disabled={saving} />
          {showDelete && (
            <button
              className="btn btn-danger gutter-left"
              onClick={this.onDelete}
              title="Delete"
              disabled={deleting}>
              {deleting ? "Deleting" : "Delete"}
            </button>
          )}
        </div>
      </form>
    );
  }

  private onDialogueChange = (index: number, dialogue: Dialogue) => {
    const current = this.state.data.dialogue;

    let updated = [];
    if(current.length === 0) {
      updated.push(dialogue);
    } else {
      updated = current.map((val, i) => {
                  return i === index
                    ? dialogue
                    : val;
                });
    }

    const change = { dialogue: updated };
    const newState = Object.assign({}, this.state.data, change);

    this.setState({ data: newState });
  }

  private onChange = (event: React.ChangeEvent<HTMLFormInput>) => {
    const field = event.target.name;
    const value = event.target.value;
    const change = { [field]: value };

    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });
  }

  private onSave = (event: React.FormEvent) => {
    event.preventDefault();

    if(!this.isValid()) {
      return;
    }

    this.saveChanges();
  }
  private isValid = () => {
    const data = this.state.data;
    const errors: {[key: string]: string} = {};

    if(!data.id || data.id.length === 0) {
      errors.id = "You must specify the unique identifer for the Character";
    }

    if(!data.name || data.name.length === 0) {
      errors.name = "You must specify the name for the Character";
    }

    if(!data.description || data.description.length === 0) {
      errors.description = "You must specify a description for the Character";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
  private saveChanges = () => {
    const updated = this.state.data;
    const saveFunc = this.props.onSave;

    saveFunc(updated);
  }

  private onDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const toDelete = this.state.data;
    const deleteFunc = this.props.onDelete;

    if(deleteFunc) {
      deleteFunc(toDelete);
    }
  }
}
