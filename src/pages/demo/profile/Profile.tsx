import * as React from "react";
import {Container} from "./_Container";
import {ProfilePanel} from "./_ProfilePanel";
import {RewardList} from "./_RewardList";

export const Profile: React.SFC = () => (
  <Container>
  {
    ({profile, redeemReward}) => {
      return (
        <React.Fragment>
          <ProfilePanel
            profile={profile} />
          <RewardList
            rewardPoints={profile.rewardPoints}
            rewards={profile.rewards}
            onRedeem={redeemReward} />
        </React.Fragment>
      );
    }
  }
  </Container>
);
