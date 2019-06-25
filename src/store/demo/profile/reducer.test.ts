import * as TypeActions from "typesafe-actions";

import { DemoProfileActions, Reward } from "./_types";
import * as Reducer from "./reducer";

// it("profile reducer - REDEEM_REWARD subtracts reward cost", () => {
//   // Arrange
//   let state = {...Reducer.initialState, rewardPoints: 15};
//   const reward: Reward = {
//     id: "test-reward",
//     title: "Test Reward",
//     description: "",
//     cost: 15,
//     timesRedeemed: 0
//   };
//   const action = TypeActions.action(DemoProfileActions.REDEEM_REWARD, reward);
//
//   state.rewards.push({...reward});
//   expect(state.rewardPoints).toEqual(15);
//
//   // Act
//   state = Reducer.reducer(state, action);
//
//   // Assert
//   expect(state.rewardPoints).toEqual(0);
// });

it("profile reducer - REDEEM_REWARD iterates reward timesRedeemed", () => {
  // Arrange
  let state = {...Reducer.initialState, rewardPoints: 16};
  const reward: Reward = {
    id: "test-reward",
    title: "Test Reward",
    description: "",
    cost: 15,
    timesRedeemed: 0
  };
  const action = TypeActions.action(DemoProfileActions.REDEEM_REWARD, reward);
  state.rewards.push({...reward});

  // Act
  state = Reducer.reducer(state, action);

  // Assert
  expect(state.rewards[0].timesRedeemed).toEqual(1);
});
