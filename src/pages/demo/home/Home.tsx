import * as React from "react";
import {Container} from "./_Container";
import {ActivePanel} from "./_ActivePanel";

export const Home: React.SFC = () => (
  <Container>
  {
    ({activeQuests, completeQuest}) => {
      return (
        <ActivePanel
          quests={activeQuests}
          onComplete={completeQuest} />
      );
    }
  }
  </Container>
);
