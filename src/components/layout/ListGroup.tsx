import * as React from "react";
import * as Bootstrap from "react-bootstrap";

const { ListGroup: ListGroupImpl, ListGroupItem: ListGroupItemImpl } = Bootstrap;

interface GroupProps {
  children: React.ReactNode
}
interface GroupItemProps {
  header?: React.ReactNode,
  onClick?: () => void,
  children: React.ReactNode
}

export const ListGroup: React.FC<GroupProps> = ({children}) => {
  return (
    <ListGroupImpl>{children}</ListGroupImpl>
  );
};

export const ListGroupItem: React.FC<GroupItemProps> = ({header, onClick, children}) => {
  return (
    <ListGroupItemImpl header={header} onClick={onClick}>
      {children}
    </ListGroupItemImpl>
  );
};
