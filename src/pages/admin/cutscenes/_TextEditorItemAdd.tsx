import * as React from "react";
import { TextArea } from "../../../components/forms";

interface Props {
  active: boolean,
  onSelect: () => void,
  onDeselect: () => void,
  onSave: (value: string) => void
}

interface State {
  value: string,
  isModified: boolean,
  enableSave: boolean
}

export class TextEditorItemAdd extends React.Component<Props, State> {
  state = {
    value: "",
    isModified: false,
    enableSave: false
  };

  private onFocus = () => {
    this.props.onSelect();
  }

  private onEnterPressed = (event: React.KeyboardEvent) => {
   const shouldSave = event.key === "Enter";
   if(!shouldSave) return;

   this.saveChanges();
  }
  private modifyText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = this.sanitizeText(event.target.value);
    const changes = {
      value: newText,
      isModified: true,
      enableSave: !!newText
    };

    this.setState(changes);
  }
  private sanitizeText = (input: string) => {
    return input.replace(/[\n\r]+/g, "");
  }

  private cancelChanges = () => {
    if(!this.state.isModified) {
      this.props.onDeselect();
    }
    else {
      this.resetState();
    }
  }
  private resetState = () => {
    this.setState({
      value: "",
      isModified: false,
      enableSave: false
    });
  }

  private saveChanges = () => {
    const { value, isModified, enableSave } = this.state;
    const { onSave } = this.props;

    if(isModified && enableSave) {
      onSave(value);
      this.setState({ value: "" });
    }
  }

  public render() {
    const { active, onSelect } = this.props;
    const { value } = this.state;

    return (
      <div className={"list-group-item text-entry" + (active ? " active" : "")}>
        <div onClick={onSelect}>
        <TextArea
          name="dialogue-text"
          autoFocus={active}
          rows={1}
          onFocus={this.onFocus}
          onChange={this.modifyText}
          onKeyPress={this.onEnterPressed}
          placeholder="Add text..."
          value={value} />
          <div className={"text-entry-controls" + (!active ? " hidden" : "")}>
            <button
                className="btn btn-success"
                aria-label="Add"
                onClick={this.saveChanges}>
              Add
            </button>
            <button
                className="close"
                aria-label="Close"
                onClick={this.cancelChanges}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
