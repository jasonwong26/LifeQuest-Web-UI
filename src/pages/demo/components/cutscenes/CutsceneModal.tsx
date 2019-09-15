import * as React from "react";

import { Modal } from "../../../../components/layout";
import { Container } from "../../Containers/ViewCutsceneContainer";
import { Layout } from "./_Layout";

import * as Store from "../../../../store/demo";

interface Props {
  scene: Store.Cutscene,
  onClose: (scene: Store.Cutscene) => void
}

export const CutscenesModal: React.SFC<Props> = ({ scene, onClose }) => {
  const onModalClose = () => { onClose(scene); };

  return (
    <Container scene={scene} onClose={onClose}>
      {({ title, imageUrl, speaker, text, moveNext }) => {
        return (
          <Modal
            onClose={onModalClose}
            title={title}>
            <Layout
              imageUrl={imageUrl}
              speaker={speaker}
              text={text}
              moveNext={moveNext}
            />
          </Modal>
        );
      }}
    </Container>
  );
};
