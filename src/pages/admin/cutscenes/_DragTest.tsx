import * as React from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from "react-beautiful-dnd";

interface Item {
  id: string,
  content: string
}

// fake data generator
const getItems: (count: number) => Item[] = count =>
  Array.from({ length: count }, ({}, k) => k).map(k => ({
    id: `item-${k + 1}`,
    content: `item ${k + 1}`
  }));

// a little function to help us with reordering the result
const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface State {
  items: Item[]
}
interface DraggableDivProps {
  content: string,
  dragProps: DraggableProvided
}

export class DragTest extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: getItems(10)
    };
  }

  private onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  public render() {
    const DraggableDiv = this.DraggableDiv;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {dropProps => (
            <div
              className="list-group"
              ref={dropProps.innerRef} >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {dragProps => (
                    <DraggableDiv dragProps={dragProps} content={item.content} />
                  )}
                </Draggable>
              ))}
              <div
                className="list-group-item">
                  external div test
              </div>
              {dropProps.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  private DraggableDiv: React.SFC<DraggableDivProps> = ({ content, dragProps }) => {
    return (
      <div
        className="list-group-item"
        ref={dragProps.innerRef}
        {...dragProps.draggableProps} >

        <span
          {...dragProps.dragHandleProps}
          className="glyphicon glyphicon-resize-vertical" />

        <span> {content}</span>
      </div>
    );
  }
}
