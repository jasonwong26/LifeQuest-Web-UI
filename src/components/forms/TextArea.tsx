import * as React from "react";

interface Props {
  autoFocus?: boolean,
  name: string,
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onKeyPress?: (event: React.KeyboardEvent) => void,
  onFocus?: (event: React.FocusEvent) => void,
  label?: string,
  placeholder?: string,
  rows?: number,
  value?: string,
  error?: string,
}

export const TextArea: React.SFC<Props> = ({ name, autoFocus, onChange, onKeyPress, onFocus, label, placeholder, rows, value, error }: Props) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  const Wrapper: React.SFC = ({children}) => (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <small className="text-danger">{error}</small>}
    </div>
  );

  const Input: React.SFC = () => (
    <textarea
      autoFocus={autoFocus}
      name={name}
      className="form-control"
      placeholder={placeholder}
      rows={rows || 3}
      value={value || ""}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onFocus={onFocus} />
  );

  if(!label) {
    return (
      <Input />
    );
  }

  return (
    <Wrapper>
      <Input />
    </Wrapper>
  );
};
