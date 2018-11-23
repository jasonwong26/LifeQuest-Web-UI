import * as React from "react";
import { Alert, Tabs, Tab, SelectCallback } from "react-bootstrap";

import { TextInput, DropDownList, TextArea, SubmitButton } from "../../../components/forms";
import { DialogueForm } from "./_DialogueForm";
import { TriggerForm } from "./_TriggerForm";
import { ScenePreview } from "./_ScenePreview";

import { DataStatus } from "../../../store/shared";
import { Cutscene, CutsceneCategory, Dialogue, Trigger, createRequest, updateRequest, deleteRequest } from "../../../store/admin/cutscenes";
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
  errors: any,
  showPreview: boolean
}

enum FormTabs {
  DialogueEditor = 1,
  TriggerEditor = 2,
  ScenePreview = 3
}

type HTMLFormInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const categoryOptions = [
  { text: "Demo", value: CutsceneCategory.DEMO },
  { text: "Tutorial", value: CutsceneCategory.TUTORIAL },
  { text: "Normal", value: CutsceneCategory.NORMAL }
];

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: props.data,
      errors: {},
      showPreview: false
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.data.id !== nextProps.data.id) {
      const newState = { data: { ...nextProps.data } };
      this.setState(newState);
    }
  }

  private onTabChange: SelectCallback = (eventKey: any) => {
    const currentTab = eventKey as FormTabs;
    const showPreview = currentTab === FormTabs.ScenePreview;

    this.setState({ showPreview });
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
  private onTriggerChange = (trigger: Trigger) => {
    const change = { trigger };
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
      errors.id = "You must specify the unique identifer for the Cutscene";
    }

    if(!data.name || data.name.length === 0) {
      errors.name = "You must specify the name for the Cutscene";
    }

    if (!data.category) {
      errors.category = "You must specify the category for the Cutscene";
    }

    if(!data.description || data.description.length === 0) {
      errors.description = "You must specify a description for the Cutscene";
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

  public render() {
    const saving = this.props.status === DataStatus.SAVING;
    const deleting = this.props.status === DataStatus.DELETING;

    const { characters, onDelete, errors: storeError } = this.props;
    const showDelete = !!onDelete;
    const { data, errors, showPreview } = this.state;

    return (
      <form
        onSubmit={this.onSave}>
        <TextInput
           label="Name"
           name="name"
           onChange={this.onChange}
           value={data.name}
           error={errors.name} />
         <DropDownList
           label="Category"
           name="category"
           onChange={this.onChange}
           options={
             categoryOptions.map(type => {
               return {
                 text: type.text,
                 value: type.value
               };
             })
           }
           defaultEmpty
           value={data.category}
           error={errors.category}
          />
        <TextArea
          key="blarghe"
          label="Description"
          name="description"
          onChange={this.onChange}
          value={data.description}
          error={errors.description} />

        <Tabs
          id="cutscene-form-tabs"
          onSelect={this.onTabChange} >
          <Tab eventKey={FormTabs.DialogueEditor} title="Dialogue" className="gutter-top">
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
          <Tab eventKey={FormTabs.TriggerEditor} title="Trigger" className="gutter-top">
            <TriggerForm data={data.trigger} onChange={this.onTriggerChange} />
          </Tab>
          <Tab eventKey={FormTabs.ScenePreview} title="Preview" className="gutter-top">
            <ScenePreview scene={data} showModal={showPreview} />
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
        { storeError && (
          <Alert bsStyle="danger">
            An error occurred saving your changes.  Please retry...
          </Alert>
        )}
      </form>
    );
  }
}
