import * as React from "react";

import { NumberInput, DropDownList } from "../../../components/forms";

import * as Store from "../../../store/admin/quests";

export interface Props {
  data: Store.RecurrencePattern,
  onChange: (recurrence: Store.RecurrencePattern) => void
}

interface State {
  value: Store.RecurrencePattern,
  errors: any
}

type HTMLFormInput = HTMLInputElement | HTMLSelectElement;

const frequencyOptions = [
  { text: "None", value: Store.Frequency.None },
  { text: "Any", value: Store.Frequency.Any },
  { text: "Weekly", value: Store.Frequency.Weekly },
  { text: "Monthly", value: Store.Frequency.Monthly }
];

export class RecurrenceForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.data,
      errors: {}
    };
  }
  public componentWillReceiveProps(nextProps: Props) {
    const value = nextProps.data;

    this.setState({ value });
  }

  private onFrequencyChange = (event: React.ChangeEvent<HTMLFormInput>) => {
    const value = event.target.value;
    const change: Store.RecurrencePattern = {
      frequency: value as Store.Frequency,
      interval: undefined,
      byDay: undefined,
      byMonthDay: undefined,
      byWeekOfMonth: undefined
    };

    this.setState({ value: change }, this.saveChanges);
  }
  private onNumberChange = (event: React.ChangeEvent<HTMLFormInput>) => {
    const field = event.target.name;
    const value = Number.parseInt(event.target.value, 10);
    const change = { [field]: value };

    const updated = Object.assign({}, this.state.value, change);
    this.setState({ value: updated }, this.saveChanges);
  }
  private saveChanges = () => {
    const { value } = this.state;

    if(!this.isValid(value)) {
      return;
    }

    this.props.onChange(value);
  }
  private isValid = (value: Store.RecurrencePattern) => {
    const errors: {[key: string]: string} = {};

    if(!value.frequency) {
      errors.frequency = "You must specify the frequency of this quest";
    }

    if(!value.interval && (value.frequency !== Store.Frequency.None && value.frequency !== Store.Frequency.Any)) {
      errors.interval = "You must specify the interval for the quest";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  public render() {
    const { value } = this.state;
    const showInterval = value.frequency !== Store.Frequency.None && value.frequency !== Store.Frequency.Any;

    return (
      <div className="row">
        <div className="col-sm-6">
          <DropDownList
            label="Frequency"
            name="frequency"
            options={
              frequencyOptions.map(opt => {
                return {
                  text: opt.text,
                  value: opt.value
                };
              })
            }
            defaultEmpty={false}
            onChange={this.onFrequencyChange}
            value={value.frequency}
            />
        </div>
        { showInterval && (
          <div className="col-sm-6">
            <NumberInput
              label="Interval"
              name="interval"
              min={1}
              max={30}
              onChange={this.onNumberChange}
              value={value.interval} />
          </div>
        )}
      </div>
    );
  }
}
