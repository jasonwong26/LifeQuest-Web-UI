import * as React from "react";

import { DropDownList, NumberInput } from "../../../components/forms";

import { Trigger, TriggerType } from "../../../store/admin/cutscenes";

interface Props {
  data: Trigger,
  onChange: (data: Trigger) => void
}

interface State {
  data: Trigger,
  errors: any
}

const typeOptions = [
  { text: "None", value: TriggerType.NONE },
  { text: "Level Attained", value: TriggerType.LEVEL_REACHED },
  { text: "Quests Completed", value: TriggerType.QUESTS_COMPLETED },
  { text: "Demo Start", value: TriggerType.DEMO_START },
  { text: "Demo End", value: TriggerType.DEMO_END }
];

export class TriggerForm extends React.Component<Props, State> {
  state = {
    data: this.props.data,
    errors: {}
  };

  public componentWillReceiveProps(nextProps: Props) {
    const { data } = nextProps;

    this.setState({ data });
  }

  private onTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    const change = { [field]: value };

    this.saveChanges<string>(change);
  }
  private onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = Number.parseInt(event.target.value, 10);
    const change = { [field]: value };

    this.saveChanges<number>(change);
  }
  private saveChanges : <T>(change: { [key: string]: T }) => void = change => {
    const updated = Object.assign({}, this.state.data, change);
    this.setState({ data: updated });

    if(this.isValid(updated)) {
      this.props.onChange(updated);
    }
  }
  private isValid = (data: Trigger) => {
    const errors: {[key: string]: string} = {};

    if(!data.type) {
      errors.name = "You must specify the type of trigger for this scene";
    }

    if(data.type === TriggerType.LEVEL_REACHED && !data.level) {
      errors.name = "You must specify the level that triggers this scene";
    }

    if(data.type === TriggerType.QUESTS_COMPLETED && !data.quests) {
      errors.name = "You must specify the number of quests completed that triggers this scene";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  public render() {
    const { data } = this.state;
    const showLevel = data.type === TriggerType.LEVEL_REACHED;
    const showQuests = data.type === TriggerType.QUESTS_COMPLETED;

    return (
      <div className="row">
        <div className="col-sm-6">
          <DropDownList
            label="Trigger Type"
            name="type"
            options={
              typeOptions.map(type => {
                return {
                  text: type.text,
                  value: type.value
                };
              })
            }
            defaultEmpty
            onChange={this.onTextChange}
            value={data.type}
            />
        </div>

        { showLevel && (
          <div className="col-sm-6">
            <NumberInput
              label="Level Attained"
              name="level"
              min={1}
              max={99}
              onChange={this.onNumberChange}
              value={data.level} />
          </div>
        )}

        { showQuests && (
          <div className="col-sm-6">
            <NumberInput
              label="Quests Completed"
              name="quests"
              min={1}
              max={9999}
              onChange={this.onNumberChange}
              value={data.quests} />
          </div>
        )}
      </div>
    );
  }
}

/*
  TODO:
  - add NumberInput component
  - finish form
  - update API
*/
