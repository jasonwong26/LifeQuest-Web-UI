import * as React from "react";

import {TextInput, TextArea, SubmitButton} from "../../../components/forms";
import {ImageForm } from "./ImageForm";

import { Character, CharacterImage, updateRequest } from "../../../store/admin/characters";

export interface FormProps {
  data: Character,
  saving: boolean,
  deleting: boolean,
  save: typeof updateRequest,
  saveError?: string
}

interface State {
  data: Character,
  errors: any
}

type HTMLFormInput = HTMLInputElement | HTMLTextAreaElement;

const emptyImage: CharacterImage = {
  title: "",
  url: "",
  notes: undefined
};

export class Form extends React.Component<FormProps, State> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      data: props.data,
      errors: {}
    };
  }

  public componentWillReceiveProps(nextProps: FormProps) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({data: Object.assign({}, nextProps.data)});
    }
  }

  public render() {
    const { saving, deleting } = this.props;
    const { data, errors } = this.state;

    const image = data.images
                    ? data.images[0]
                    : emptyImage;

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
        <ImageForm
          data={image}
          onChange={this.onImageChange}
          />
        <hr/>

        <div className="form-group">
          <SubmitButton
            value={saving ? "Saving" : "Save"}
            disabled={saving} />
          <button
            className="btn btn-danger gutter-left"
            onClick={this.onDelete}
            title="Delete"
            disabled={deleting}>
            {deleting ? "Deleting" : "Delete"}
          </button>
        </div>
      </form>
    );
  }

  private onImageChange = (image: CharacterImage) => {
    const change = { images: [ image ] };
    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });
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
    const saveFunc = this.props.save;

    saveFunc(updated);
  }

  private onDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    alert("Delete clicked!");
  }
}
