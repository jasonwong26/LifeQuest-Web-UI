import * as React from "react";
import { Alert } from "react-bootstrap";

import { TextInput, TextArea, NumberInput, SubmitButton } from "../../../components/forms";

import {CategoriesForm} from "./_CategoriesForm";
import {RecurrenceForm} from "./_RecurrenceForm";

import { DataStatus } from "../../../store/shared";
import * as Store from "../../../store/admin/quests";

type saveRequest = typeof Store.createRequest | typeof Store.updateRequest;

export interface Props {
  data: Store.Quest,
  status: DataStatus,
  errors?: string,

  onSave: saveRequest,
  onDelete?: typeof Store.deleteRequest
}

interface State {
  data: Store.Quest,
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
      this.setState({ data: {...nextProps.data} });
    }
  }

  private onChange = (event: React.ChangeEvent<HTMLFormInput>) => {
    const field = event.target.name;
    const value = event.target.value;
    const change = { [field]: value };

    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });
  }
  private onCategoriesChange = (categories?: string[]) => {
    const { data } = this.state;
    const change = { categories };

    const updated = Object.assign({}, data, change);
    this.setState({ data: updated });
  }
  private onRecurrenceChange = (recurrence: Store.RecurrencePattern) => {
    const { data } = this.state;
    const change = { recurrence };

    const updated = Object.assign({}, data, change);
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
      errors.id = "You must specify the unique identifer for the Quest";
    }

    if(!data.name || data.name.length === 0) {
      errors.name = "You must specify the name for the Quest";
    }

    if(!data.description || data.description.length === 0) {
      errors.description = "You must specify a description for the Quest";
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
    const { status, onDelete, errors: storeError } = this.props;
    const { data, errors } = this.state;
    const showDelete = !!onDelete;

    const saving = status === DataStatus.SAVING;
    const deleting = status === DataStatus.DELETING;

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
        <CategoriesForm
          data={data.categories || []}
          onChange={this.onCategoriesChange}
          />
        <hr/>

        <TextArea
          label="Instructions"
          name="instructions"
          onChange={this.onChange}
          value={data.instructions}
          error={errors.instructions} />
        <TextArea
          label="Flavor Text"
          name="flavorText"
          onChange={this.onChange}
          value={data.flavorText}
          error={errors.flavorText} />

        <div className="row">
          <div className="col-sm-6">
            <NumberInput
              label="Experience"
              name="experience"
              onChange={this.onChange}
              value={data.experience}
              error={errors.experience}
              min={0}
              max={9999} />
          </div>
          <div className="col-sm-6">
            <NumberInput
              label="Reward Points"
              name="rewardPoints"
              onChange={this.onChange}
              value={data.rewardPoints}
              error={errors.rewardPoints}
              min={0}
              max={999} />
          </div>
        </div>

        <hr/>

        <RecurrenceForm
          data={data.recurrence}
          onChange={this.onRecurrenceChange}
          />

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
