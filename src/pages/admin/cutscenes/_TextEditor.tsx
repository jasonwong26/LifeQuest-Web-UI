import * as React from "react";
import * as shortid from "shortid";
import ClickOutside from "react-click-outside";
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from "react-beautiful-dnd";

import {TextEditorItem} from "./_TextEditorItem";
import {TextEditorItemAdd} from "./_TextEditorItemAdd";

interface Props {
  data: string[],
  onChange: (text: string[]) => void
}

interface State {
  model: TextModel[],
  newItemId: string,
  activeId: string | null,
}
interface TextModel {
  id: string,
  value: string
}

interface EditItemModel {
  item: TextModel,
  activeId: string | null,
  dragProps: DraggableProvided
}
interface AddItemModel {
  newItemId: string
  activeId: string | null
}

class TextEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { data } = props;
    const model = this.mapToStateModel(data);
    const newItemId = shortid.generate();

    this.state = {
      model,
      newItemId,
      activeId: null
    };
  }

  public componentWillReceiveProps(nextProps: Props) {
    const { data } = nextProps;
    const model = this.mapToStateModel(data);

    this.setState({
      model
    });
  }
  private mapToStateModel = (input: string[]) => {
    return input.map(text => {
      return this.mapToTextModel(text);
    });
  }
  private mapToTextModel = (input: string) => {
    return {
      id: shortid.generate(),
      value: input
    } as TextModel;
  }

  public handleClickOutside() {
    this.setState({ activeId: null });
  }

  private onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const clone = [...this.state.model];
    const [removed] = clone.splice(startIndex, 1);
    clone.splice(endIndex, 0, removed);

    this.setState({
      model: clone
    }, this.saveChanges);
  }

  private onSelect = (id: string) => {
    this.setState({ activeId: id });
  }
  private onDeselect = () => {
    this.setState({ activeId: null });
  }

  private onCreate = (text: string) => {
    const newItem = this.mapToTextModel(text);
    const changes = [...this.state.model, newItem];
    const newState = {
      model: changes,
      activeId: this.state.newItemId
    };

    this.setState(newState, this.saveChanges);
  }
  private onUpdate = (id: string, newText: string) => {
    const changes = this.state.model.map(existing => {
      return existing.id !== id
        ? existing
        : {
            id: existing.id,
            value: newText
          };
    });
    const newState = { model: changes };

    this.setState(newState, this.saveChanges);
  }
  private onDelete = (id: string) => {
    const changes = this.state.model.filter(existing => {
      return existing.id !== id;
    });
    const newState = { model: changes };

    this.setState(newState, this.saveChanges);
  }
  private saveChanges = () => {
    const saveFunc = this.props.onChange;
    const model = this.state.model;
    const data = model.map(e => (e.value));

    saveFunc(data);
  }

  public render() {
    const { model, activeId, newItemId } = this.state;
    const EditItem = this.EditItem;
    const AddItem = this.AddItem;

    return (
      <div className="form-group">
        <label>Text</label>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="dialogue-text-editor">
            {dropProps => (
              <div
                className="list-group dialogue-text-editor"
                ref={dropProps.innerRef} >
                { model.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {dragProps => (
                      <EditItem dragProps={dragProps} key={item.id} item={item} activeId={activeId} />
                    )}
                  </Draggable>
                ))}
                {dropProps.placeholder}
                <AddItem
                  activeId={activeId}
                  newItemId={newItemId}
                  />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }

  private EditItem: React.SFC<EditItemModel> = ({ item, activeId, dragProps }) => {
    const active = activeId != null && activeId === item.id;

    const onSelect = () => { if (!active) { this.onSelect(item.id); } };
    const onDeselect = () => { if (active) { this.onDeselect(); } };
    const onUpdate = (newText: string) => { this.onUpdate(item.id, newText); };
    const onDelete = () => { this.onDelete(item.id); };

    return (
      <TextEditorItem
        active={active}
        value={item.value}
        dragProps={dragProps}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onSave={onUpdate}
        onDelete={onDelete} />
    );
  }

  private AddItem: React.SFC<AddItemModel> = ({ newItemId, activeId }) => {
    const isAddItemActive = activeId === newItemId;
    const onAddSelected = () => { if(!isAddItemActive) { this.onSelect(newItemId); } };
    const onAddDeselected = () => { if(isAddItemActive) { this.onDeselect(); } };

    return (
      <TextEditorItemAdd
        key={newItemId}
        active={isAddItemActive}
        onSelect={onAddSelected}
        onDeselect={onAddDeselected}
        onSave={this.onCreate} />
    );
  }
}

const outsideAware = ClickOutside(TextEditor);

export {
  outsideAware as TextEditor
};
