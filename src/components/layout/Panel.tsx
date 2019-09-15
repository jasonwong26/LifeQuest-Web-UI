import * as React from "react";
import * as Bootstrap from "react-bootstrap";

const { Panel: PanelImpl } = Bootstrap;

interface Props {
  title?: React.ReactNode,
  children: React.ReactNode
}

export const Panel: React.FC<Props> = ({title, children}) => {
  return (
    <PanelImpl>
      {!!title && (<PanelImpl.Heading>{title}</PanelImpl.Heading>)}
      <PanelImpl.Body>{children}</PanelImpl.Body>
    </PanelImpl>
  );
};
