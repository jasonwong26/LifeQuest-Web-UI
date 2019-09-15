import * as React from "react";

import {Button, Panel} from "../../../components/layout";
import {Quest, completeQuest} from "../../../store/demo";

interface Props {
  quests: Quest[]
  onComplete: typeof completeQuest
}

export const ActivePanel: React.SFC<Props> = ({quests, onComplete}) => {
  const markQuestcompleted = () => {
    onComplete(quest);
  };

  if(quests.length === 0) {
    return (
      <Panel
        title="Active Quests">
        <div>
          <p>hrm... you don't have any active quests right now.  You should go get one!</p>
        </div>
      </Panel>
    );
  }
  const quest = quests[0];
  return (
    <Panel>
      <h3>{quest.title}</h3>
      <div>
        <p>{quest.instructions || quest.description}</p>
        <Button onClick={markQuestcompleted}>Completed!</Button>
      </div>
    </Panel>
  );
};
