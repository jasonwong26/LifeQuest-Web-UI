import * as React from "react";

interface Props {
  name: string,
  label: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: number,
  min?: number,
  max?: number,
  increment?: number,
  error?: string
}

export const NumberInput: React.SFC<Props> = ({ name, label, onChange, placeholder, value, min, max, increment, error }: Props) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="number"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value||""}
          min={min}
          max={max}
          step={increment}          
          onChange={onChange}/>
        {error && <small className="text-danger">{error}</small>}
      </div>
    </div>
  );
};
