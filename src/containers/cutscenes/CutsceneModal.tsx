import * as React from "react";
import { Modal } from "react-bootstrap";

import { Container } from "./_Container";
import { Layout } from "./_Layout";

import * as Store from "../../store/admin/cutscenes";

interface Props {
  scene: Store.Cutscene,
  onClose: () => void
}

export const CutscenesModal: React.SFC<Props> = ({ scene, onClose }) => {
  return (
    <Container scene={scene} onClose={onClose}>
      {({ sceneContainer, title, imageUrl, speaker, text, moveNext }) => {
        return (
          <Modal
            show
            backdrop
            onExit={onClose}
            onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Layout
                sceneContainer={sceneContainer}
                imageUrl={imageUrl}
                speaker={speaker}
                text={text}
                moveNext={moveNext}
              />
            </Modal.Body>
          </Modal>
        );
      }}
    </Container>
  );
};
