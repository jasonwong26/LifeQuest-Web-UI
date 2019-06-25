import * as React from "react";
import {Panel} from "react-bootstrap";

import {Profile} from "../../../store/demo";

interface Props {
  profile: Profile
}

export const ProfilePanel: React.SFC<Props> = ({profile}) => {
  return (
    <Panel>
      <Panel.Body>
        <h3>My Profile</h3>
        <div>
          <p><strong>Level</strong>: {profile.level}</p>
          <p><strong>Experience</strong>: {profile.experience}</p>
          <p><strong>Reward Points</strong>: {profile.rewardPoints}</p>
        </div>
      </Panel.Body>
    </Panel>
  );
};
