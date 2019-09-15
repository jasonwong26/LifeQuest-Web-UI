import * as React from "react";
import * as Bootstrap from "react-bootstrap";

const { Alert: AlertImpl } = Bootstrap;

interface Props {
  type?: AlertType,
  children: React.ReactNode
}
export enum AlertType {
  Success = "success",
  Warning = "warning",
  Danger = "danger",
  Info = "info"
}
export const Alert: React.FC<Props> = ({type, children}) => {
  return (
    <AlertImpl bsStyle={type}>{children}</AlertImpl>
  );
};
