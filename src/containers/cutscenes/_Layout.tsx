import * as React from "react";

interface Props {
  sceneContainer: React.RefObject<HTMLDivElement>,
  imageUrl: string,
  speaker: string,
  text: string,
  moveNext: () => void
}

export const Layout: React.SFC<Props> = ({ sceneContainer, imageUrl, speaker, text, moveNext }) => {
  const onClick = () => {
    moveNext();
  };

  const movementKeys = ["Enter", " "];
  const onKeyPress = (e: React.KeyboardEvent) => {
    if(movementKeys.indexOf(e.key) !== -1) {
      moveNext();
    }
  };

  const node = sceneContainer.current;
  if(node) {
    node.focus();
  }

  return (
    <div
      ref={sceneContainer}
      onClick={onClick}
      onKeyPress={onKeyPress}
      className="scene-container"
      tabIndex={0}>
      <img src={imageUrl} alt={speaker} className="img-responsive center-block img-rounded" />
      <h4>{speaker}</h4>
      <div className="scene-text">{text}</div>
    </div>
  );
};
