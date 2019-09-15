import * as React from "react";
import * as Bootstrap from "react-bootstrap";

const { Modal: ModalImpl } = Bootstrap;

interface Props {
  title: React.ReactNode,
  children: React.ReactNode,
  onClose: () => void
}

export const Modal: React.FC<Props> = ({title, children, onClose}) => {
  return (
    <ModalImpl
      show
      backdrop
      onExit={onClose}
      onHide={onClose}>
      <ModalImpl.Header closeButton>
        <ModalImpl.Title>{title}</ModalImpl.Title>
      </ModalImpl.Header>
      <ModalImpl.Body>{children}</ModalImpl.Body>
    </ModalImpl>
  );
};