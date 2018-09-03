import * as React from "react";

interface Props {
  name: string,
  label: string,
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  placeholder?: string,
  rows?: number,
  value?: string,
  error?: string
}

export const TextArea: React.SFC<Props> = ({name, label, onChange, placeholder, rows, value, error}: Props) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        className="form-control"
        placeholder={placeholder}
        rows={rows || 3}
        value={value}
        onChange={onChange}/>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};
