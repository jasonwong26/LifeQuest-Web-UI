import * as React from "react";

import {Quest, activateQuest} from "../../../store/demo";

import {ListItem} from "./_ListItem";

interface Props {
  quests: Quest[]
  onAccept: typeof activateQuest
}

export const List: React.SFC<Props> = ({quests, onAccept}) => {
  return (
    <React.Fragment>
      { quests.map(q =>
          <ListItem key={q.id} quest={q} onAccept={onAccept} />
      )}
    </React.Fragment>
  );
};
