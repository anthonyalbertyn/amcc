import { ADD_BET, ADD_ACTIVITY } from "./actionTypes";

let nextBetId = 0;
let nextActivityId = 0;

export const addBet = (content) => ({
  type: ADD_BET,
  payload: {
    id: ++nextBetId,
    content,
  },
});

export const addActivity = (content) => ({
  type: ADD_ACTIVITY,
  payload: {
    id: ++nextActivityId,
    content,
  },
});
