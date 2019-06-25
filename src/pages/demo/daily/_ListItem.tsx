import * as React from "react";
import {Button, Panel} from "react-bootstrap";

import {Quest, activateQuest} from "../../../store/demo";

interface Props {
  quest: Quest
  onAccept: typeof activateQuest
}

export const ListItem: React.SFC<Props> = ({quest, onAccept}) => {
  const acceptQuest = () => {
    onAccept(quest);
  };

  return (
    <Panel>
      <Panel.Body>
        <h3>{quest.title}</h3>
        <div>
          <p>{quest.description }</p>
          <p><em>{quest.flavorText}</em></p>
          <Button onClick={acceptQuest}>Accept</Button>
        </div>
      </Panel.Body>
    </Panel>
  );
};
