import * as React from "react";

import { TextInput, TextArea } from "../../../components/forms";

import { CharacterImage } from "../../../store/admin/characters";

export interface ImageFormProps {
  data: CharacterImage,
  onChange: (image: CharacterImage) => void
}

interface State {
  data: CharacterImage,
  errors: any
}

type HTMLFormInput = HTMLInputElement | HTMLTextAreaElement;

export class ImageForm extends React.Component<ImageFormProps, State> {
  constructor(props: ImageFormProps) {
    super(props);

    this.state = {
      data: props.data,
      errors: {}
    };
  }

  public componentWillReceiveProps(nextProps: ImageFormProps) {
    this.setState({data: Object.assign({}, nextProps.data)});
  }

  public render() {
    const { data, errors } = this.state;
    const displayImage = data.url.length > 0 && data.title.length > 0;

    return (
      <div className="row">
        <div className="col-sm-10">
          <TextInput
            label="Image Title"
            name="title"
            onChange={this.onChange}
            value={data.title}
            error={errors.title}
            />
          <TextInput
            label="Image Url"
            name="url"
            onChange={this.onChange}
            value={data.url}
            error={errors.url}
            />
          <TextArea
            label="Image Notes"
            name="notes"
            onChange={this.onChange}
            value={data.notes}
            error={errors.notes} />
        </div>
        {displayImage && (
          <div className="col-sm-2">
            <img
              className="img-responsive img-thumbnail gutter-top"
              src={data.url}
              alt={data.title}
              style={{width: "100%", height: "200px" } } />
          </div>
        )}
      </div>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLFormInput>) => {
    const field = event.target.name;
    const value = event.target.value;
    const change = { [field]: value };

    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });

    if(this.isValid()) {
      this.props.onChange(updated);
    }
  }
  private isValid = () => {
    const data = this.state.data;
    const errors: {[key: string]: string} = {};

    if(!data.title || data.title.length === 0) {
      errors.id = "You must specify the title for this Image";
    }

    if(!data.url || data.url.length === 0) {
      errors.name = "You must specify the url for this Image";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
}
