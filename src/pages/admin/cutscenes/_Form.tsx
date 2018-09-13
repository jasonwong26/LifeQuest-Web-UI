import * as React from "react";

import {TextInput, TextArea, SubmitButton} from "../../../components/forms";

import { DataStatus } from "../../../store/shared";
import { Cutscene, createRequest, updateRequest, deleteRequest } from "../../../store/admin/cutscenes";

type saveRequest = typeof createRequest | typeof updateRequest;

export interface Props {
  data: Cutscene,
  status: DataStatus,
  errors?: string,

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

    const { onDelete } = this.props;
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
