import * as React from "react";
import { DraggableProvided } from "react-beautiful-dnd";


import { TextArea } from "../../../components/forms";

interface Props {
  active: boolean,
  value: string,
  onSelect: () => void,
  onDeselect: () => void,
  onSave: (value: string) => void,
  onDelete: () => void
}
interface ExtensionProps {
  dragProps: DraggableProvided
}
type AllProps = Props & ExtensionProps;

interface State {
  value: string,
  isModified: boolean,
  enableSave: boolean
}

export class TextEditorItem extends React.Component<AllProps, State> {
  state = {
    value: this.props.value,
    isModified: false,
    enableSave: false
  };

  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value,
      isModified: false,
      enableSave: false
    });
  }

  private onEnterPressed = (event: React.KeyboardEvent) => {
   const shouldSave = event.key === "Enter";
   if(!shouldSave) return;

   this.save();
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
      value: this.props.value,
      isModified: false,
      enableSave: false
    });
  }

  private save = () => {
    const { value, isModified, enableSave } = this.state;
    const { onSave, onDeselect } = this.props;

    if(isModified && enableSave) {
      onSave(value);
    }

    onDeselect();
  }
  private delete = () => {
    const { onDelete, onDeselect } = this.props;

    onDelete();
    onDeselect();
  }

  public render() {
    const { active, dragProps, onSelect } = this.props;
    const { value } = this.state;

    return (
      <div
        ref={dragProps.innerRef}
        {...dragProps.draggableProps}
        {...dragProps.dragHandleProps}
        className={"list-group-item text-entry" + (active ? " active" : "")}
        onClick={onSelect}>
        <div className={active ? "hidden" : ""}>
          <span className="form-control form-control-static">
              {value}
          </span>
        </div>
        <div className={active ? "" : "hidden"}>
          <TextArea
            name="dialogue-text"
              autoFocus={active}
              rows={1}
              onChange={this.modifyText}
              onKeyPress={this.onEnterPressed}
              value={value} />
          <div className={"text-entry-controls" + (!active ? " hidden" : "")}>
            <button
                className="btn btn-success"
                aria-label="Save"
                onClick={this.save}>
              Save
            </button>
            <button
                className="close"
                aria-label="Close"
                onClick={this.cancelChanges}>
              <span aria-hidden="true">&times;</span>
            </button>

            <button
                className="btn btn-danger pull-right"
                aria-label="Delete"
                onClick={this.delete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
