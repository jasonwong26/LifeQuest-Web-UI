import * as React from "react";
import * as Bootstrap from "react-bootstrap";

const { Button: ButtonImpl } = Bootstrap;

interface Props {
  type?: ButtonType,
  size?: ButtonSize,
  onClick?: () => void,
  disabled?: boolean,
  children: React.ReactNode
}
export enum ButtonType {
  Primary = "primary",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
  Info = "info",
  Link = "link"
}

export enum ButtonSize {
  Large = "large",
  Small = "small",
  Xsmall = "xsmall"
}

export const Button: React.FC<Props> = ({type, size, onClick, disabled, children}) => {
  return (
    <ButtonImpl bsStyle={type} bsSize={size} onClick={onClick} disabled={disabled}>{children}</ButtonImpl>
  );
};
