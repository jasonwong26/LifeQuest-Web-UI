import * as React from "react";
import {Button, Panel} from "react-bootstrap";

import {Reward, redeemReward} from "../../../store/demo";

interface Props {
  rewardPoints: number,
  reward: Reward
  onRedeem: typeof redeemReward
}

export const RewardListItem: React.SFC<Props> = ({rewardPoints, reward, onRedeem}) => {
  const canAfford = rewardPoints >= reward.cost;
  const redeem = () => {
    // TODO: convert this to an alert message...
    if(!canAfford) return;
    onRedeem(reward);
  };

  return (
    <Panel>
      <Panel.Body>
        <h3>{reward.title}</h3>
        <div>
          <p>{reward.description}</p>
          <div className="row">
            <div className="col-sm-6">
              <strong>Cost</strong>: {reward.cost}
            </div>
            <div className="col-sm-6">
              <strong>Times Redeemed</strong>: {reward.timesRedeemed}
            </div>
          </div>

          <div className="text-right">
            <Button
              className={(canAfford ? "btn-success" : "btn-danger")}
              disabled={!canAfford}
              onClick={redeem}>
              Redeem
            </Button>
          </div>
        </div>
      </Panel.Body>
    </Panel>
  );
};
