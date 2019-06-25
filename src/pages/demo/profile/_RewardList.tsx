import * as React from "react";
import * as shortid from "shortid";

import {Reward, redeemReward} from "../../../store/demo";

import {RewardListItem} from "./_RewardListItem";

interface Props {
  rewardPoints: number,
  rewards: Reward[]
  onRedeem: typeof redeemReward
}

export const RewardList: React.SFC<Props> = ({rewardPoints, rewards, onRedeem}) => {
  return (
    <React.Fragment>
      { rewards.map(r =>
          <RewardListItem
            key={shortid.generate()}
            rewardPoints={rewardPoints}
            reward={r}
            onRedeem={onRedeem} />
      )}
    </React.Fragment>
  );
};
