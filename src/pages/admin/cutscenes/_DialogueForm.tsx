import * as React from "react";

import { TextInput, DropDownList } from "../../../components/forms";
import { TextEditor } from "./_TextEditor";

import { Dialogue } from "../../../store/admin/cutscenes";
import { Character } from "../../../store/admin/characters";

export interface Props {
  index: number,
  data: Dialogue,
  characters: Character[]
  showAdd: boolean,
  onChange: (index: number, image: Dialogue) => void,
}

interface State {
  data: Dialogue,
  selectedCharacter?: Character,
  errors: any
}

type HTMLFormInput = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export class DialogueForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { data, characters } = props;
    const selectedId = data.characterId;
    const selectedCharacter = characters.find(char => char.id === selectedId);

    this.state = {
      data,
      selectedCharacter,
      errors: {}
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    const { data, characters } = nextProps;
    const selectedId = data.characterId;
    const selectedCharacter = characters.find(char => char.id === selectedId);

    const newState = {
      data,
      selectedCharacter
    };

    this.setState(newState);
  }

  public render() {
    const { characters } = this.props;
    const { data, selectedCharacter, errors } = this.state;
    const selectedImage = selectedCharacter
                       && selectedCharacter.images.find(img => img.url === data.imageUrl);

    return (
      <div className="row">
        <div className="col-sm-10">
          <div className="row">
            <div className="col-sm-6">
              <DropDownList
                label="Character"
                name="character"
                options={
                  characters.map(char => {
                    return {
                      text: char.name,
                      value: char.id
                    };
                  })
                }
                defaultEmpty
                onChange={this.onCharacterChange}
                value={selectedCharacter && selectedCharacter.id}
                />
            </div>
            <div className="col-sm-6">
              <DropDownList
                label="Image"
                name="imageUrl"
                options={
                  selectedCharacter && selectedCharacter.images.map(img => {
                    return {
                      text: img.title,
                      value: img.url
                    };
                  })
                }
                defaultEmpty
                onChange={this.onImageChange}
                value={selectedImage && selectedImage.url}
                />
            </div>
          </div>

          <TextInput
            label="Speaker"
            name="speaker"
            onChange={this.onChange}
            value={data.speaker}
            error={errors.speaker}
            />
          <TextEditor
            data={data.text}
            onChange={this.onTextChange}
          />

        </div>
        <div className="col-sm-2">
          { selectedImage && (
            <div>
              <img
                className="img-responsive img-thumbnail gutter-top"
                src={selectedImage.url}
                alt={selectedImage.title}
                style={{width: "100%", height: "200px" } } />
            </div>
          )}
        </div>
      </div>
    );
  }

  private onCharacterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const selected = this.state.selectedCharacter;

    if(selected && selected.id === value) {
      return;
    }

    const newSelected = this.props.characters.find(char => {
      return char.id === value;
    });

    this.setState({ selectedCharacter: newSelected });
  }
  private onImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const character = this.state.selectedCharacter;

    if (!character || !value) {
      return;
    }

    const change = {
      characterId: character.id,
      imageUrl: value
    };
    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });

    if(this.isValid(updated)) {
      const index = this.props.index;
      this.props.onChange(index, updated);
    }
  }

  private onTextChange = (newText: string[]) => {
    const field = "text";
    const value = newText;
    const change = { [field]: value };

    this.saveChanges<string[]>(change);
  }

  private onChange = (event: React.ChangeEvent<HTMLFormInput>) => {
    const field = event.target.name;
    const value = event.target.value;
    const change = { [field]: value };

    this.saveChanges<string>(change);
  }
  private saveChanges : <T>(change: { [key: string]: T }) => void = change => {
    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });

    if(this.isValid(updated)) {
      const index = this.props.index;
      this.props.onChange(index, updated);
    }
  }
  private isValid = (data: Dialogue) => {
    const errors: {[key: string]: string} = {};

    if(!data.characterId || data.characterId.length === 0) {
      errors.name = "You must specify the character to display for this section of dialogue";
    }

    if(!data.imageUrl || data.imageUrl.length === 0) {
      errors.name = "You must specify the image for this section of dialogue";
    }

    if(!data.speaker || data.speaker.length === 0) {
      errors.id = "You must specify the speaker for this section of dialogue";
    }

    if(!data.text || data.text.length === 0) {
      errors.description = "You must specify the text for this section of dialogue";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
}
