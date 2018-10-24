import * as React from "react";
import * as shortid from "shortid";
import * as ClickOutside from "react-click-outside";

import { TextArea } from "../../../components/forms";

export interface Props {
  data: string[],
  onChange: (categories?: string[]) => void,
  active?: boolean
}

interface State {
  active: boolean,
  value: string,
  error?: string
}

type HTMLFormInput = HTMLTextAreaElement;

class CategoriesForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { data, active } = props;
    const value = this.mapToStateModel(data);

    this.state = {
      active: active || false,
      value,
      error: undefined
    };
  }
  public componentWillReceiveProps(nextProps: Props) {
    const { data, active } = nextProps;
    const value = this.mapToStateModel(data);

    this.setState({ active: active || false, value });
  }
  private mapToStateModel = (input: string[]) => {
    return input.join(", ");
  }

  public handleClickOutside() {
    this.cancel();
  }

  private onTextChanged = (event: React.ChangeEvent<HTMLFormInput>) => {
    const changes = {
      value: event.target.value
    };

    this.setState(changes);
  }

  private cancel = () => {
    this.setState({ active: false });
  }
  private edit = () => {
    this.setState({ active: true });
  }
  private save = () => {
    const { value } = this.state;
    const arr = this.mapToPropsModel(value);

    if(!this.isValid(arr)) {
      return;
    }

    const { onChange } = this.props;
    onChange(arr);
    this.setState({ active: false });
  }
  private mapToPropsModel = (input: string) => {

    if(!input) return undefined;

    const arr = input.split(", ");
    return arr;
  }
  private isValid = (arr?: string[]) => {
    let error;

    if(arr) {
      const map = new Map();
      arr.map(a => map.set(a.toLocaleLowerCase(), a));

      if(map.size !== arr.length) {
        error = "Duplicate category(s) exist.";
      }
    }

    this.setState({ error });
    return !error;
  }

  public render() {
    const { data } = this.props;
    const { active, value, error } = this.state;

    if(active) {
      return (
        <div className="row">
          <div className="col-sm-10">
              <TextArea
                label="Categories"
                name="value"
                placeholder="comma separated list of categories"
                onChange={this.onTextChanged}
                value={value}
                error={error} />
          </div>
          <div className="col-sm-2">
            <button
                type="button"
                className="btn btn-success gutter-right"
                aria-label="Save"
                onClick={this.save}>
              Save
            </button>
            <button
                type="button"
                className="btn btn-primary"
                aria-label="Cancel"
                onClick={this.cancel}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-10">
          <div>
            <label>Categories</label>
          </div>
          { data.length === 0 && (
            <small>
              This quest has no categories...
            </small>
          )}
          { data.length > 0 && (
            data.map(category => {
              const key = shortid.generate();
              return (
                <span
                  key={key}
                  className="badge gutter-right">
                  {category}
                </span>
              );
          }))}
        </div>
        <div className="col-sm-2">
          <button
              type="button"
              className="btn btn-info"
              aria-label="Edit"
              onClick={this.edit}>
            Edit
          </button>
        </div>
      </div>
    );
  }
}

const outsideAware = ClickOutside(CategoriesForm);

export {
  outsideAware as CategoriesForm
};
