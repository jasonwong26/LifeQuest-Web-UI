import * as React from "react";

interface Props {
  value: string,
  disabled: boolean
}

export const SubmitButton: React.SFC<Props> = ({value, disabled}: Props) => {
  return (
    <input
      className="btn btn-success"
      type="submit"
      value={value}
      disabled={disabled}
      />
  );
};
