import * as React from "react";

import {TextInput, TextArea, SubmitButton} from "../../../components/forms";
import {ImageForm } from "./ImageForm";

import { Character, CharacterImage, createRequest, updateRequest, deleteRequest } from "../../../store/admin/characters";

type saveRequest = typeof createRequest | typeof updateRequest;

export interface FormProps {
  data: Character,

  saving: boolean,
  onSave: saveRequest,
  saveError?: string,

  deleting?: boolean,
  onDelete?: typeof deleteRequest
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
    const { saving, onDelete } = this.props;
    const { data, errors } = this.state;
    const showDelete = !!onDelete;
    const deleting = this.props.deleting || false;

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

        { this.renderImages(data) }

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

  private renderImages = (data: Character) => {
    const hasImages = !!data.images && data.images.length > 0;

    if(!hasImages) {
      const template = Object.assign({}, emptyImage);
      const showAdd = true;

      return (
        <React.Fragment
          key={0}>
        <hr/>
        <ImageForm
          index={0}
          data={template}
          showAdd={showAdd}
          onAdd={this.onImageAdd}
          onChange={this.onImageChange}
          onDelete={this.onImageDelete}
          />
        </React.Fragment>
      );
    }

    return (
      data.images.map((image, index) => {
        const showAdd = index === data.images.length - 1;
        return (
          <React.Fragment
            key={index}>
          <hr/>
          <ImageForm
            index={index}
            data={image}
            showAdd={showAdd}
            onAdd={this.onImageAdd}
            onChange={this.onImageChange}
            onDelete={this.onImageDelete}
            />
          </React.Fragment>
        );
      })
    );
  }

  private onImageAdd = () => {
    const current = this.state.data.images;
    const template = Object.assign({}, emptyImage);
    const updated = [...current, template];
    const change = { images: updated };
    const newState = Object.assign({}, this.state.data, change);

    this.setState({ data: newState });
  }
  private onImageChange = (index: number, image: CharacterImage) => {
    const current = this.state.data.images || [];

    let updated = [];
    if(current.length === 0) {
      updated.push(image);
    } else {
      updated = current.map((val, i) => {
                  return i === index
                    ? image
                    : val;
                });
    }

    const change = { images: updated };
    const newState = Object.assign({}, this.state.data, change);

    this.setState({ data: newState });
  }
  private onImageDelete = (index: number) => {
    const current = this.state.data.images || [];
    const updated = current.filter(({}, i) => {
      return i !== index;
    });
    const change = { images: updated };
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
