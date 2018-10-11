import * as React from "react";

interface Props {
  name: string,
  label: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  defaultEmpty: boolean,
  options?: Option[],
  value?: string,
  error?: string
}

interface Option {
  text: string,
  value: string
}

export const DropDownList: React.SFC<Props> = ({ name, label, onChange, options, defaultEmpty, value, error }: Props) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          name={name}
          className="form-control"
          value={value}
          onChange={onChange}>
          {defaultEmpty && (
            <option value="" />
          )}
          {options && options.map(opt => {
            return <option key={opt.value} value={opt.value}>{opt.text}</option>;
          })
          }
        </select>
        {error && <small className="text-danger">{error}</small>}
      </div>
    </div>
  );
};
