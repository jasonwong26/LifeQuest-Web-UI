import * as React from "react";

import {TextInput, TextArea, SubmitButton} from "../../../components/forms";

import { Character } from "../../../store/admin/characters";

interface Props {
  data: Character,
  save?: () => void
}

interface State {
  data: Character,
  errors: any,
  saving: boolean
}

type HTMLFormInput = HTMLInputElement | HTMLTextAreaElement;

class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: props.data,
      errors: {},
      saving: false
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({data: Object.assign({}, nextProps.data)});
    }
  }

  public render() {
    return (
      <form
        onSubmit={this.onSave}>
        <TextInput
          label="Slug"
          name="id"
          onChange={this.onChange}
          value={this.state.data.id}
          error={this.state.errors.id}
         />
         <TextInput
           label="Name"
           name="name"
           onChange={this.onChange}
           value={this.state.data.name}
           error={this.state.errors.name}
          />
        <TextArea
          label="Description"
          name="description"
          onChange={this.onChange}
          value={this.state.data.description}
          error={this.state.errors.description}
          />

          <SubmitButton
            value={this.state.saving ? "Saving" : "Save"}
            disabled={this.state.saving}
            />
      </form>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLFormInput> ) => {
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

    alert("saving...");
  }
  private isValid: () => boolean = () => {
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
}



export default Form;
