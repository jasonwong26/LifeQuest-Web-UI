import * as React from "react";
import {Container} from "./_Container";
import {List} from "./_List";

export const DailyQuests: React.SFC = () => (
  <Container>
  {
    ({dailyQuests, activateQuest}) => {
      if(dailyQuests.length === 0) {
        return (
          <div>
            There aren't any quests available right now.
            Check back in a bit, I'll have more for you soon!
          </div>
        );
      }

      return (
        <List
          quests={dailyQuests}
          onAccept={activateQuest} />
      );
    }
  }
  </Container>
);
