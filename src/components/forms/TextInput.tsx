import * as React from "react";

interface Props {
  name: string,
  label: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  error?: string
}

export const TextInput: React.SFC<Props> = ({name, label, onChange, placeholder, value, error}: Props) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}/>
        {error && <small className="text-danger">{error}</small>}
      </div>
    </div>
  );
};
