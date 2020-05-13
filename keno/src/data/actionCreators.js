import { ADD_ANALYTICS, ADD_BET, ADD_SETTING } from "./actionTypes";

let nextBetId = 0;
let nextAnalyticsId = 0;

export const addAnalytics = (content) => ({
  type: ADD_ANALYTICS,
  payload: {
    id: ++nextAnalyticsId,
    content,
  },
});

export const addBet = (content) => ({
  type: ADD_BET,
  payload: {
    id: ++nextBetId,
    content,
  },
});

export const addSetting = (content) => ({
  type: ADD_SETTING,
  payload: {
    content,
  },
});
