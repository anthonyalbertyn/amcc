import { ADD_BET } from "../actionTypes";

const defaultState = {
  bets: [],
};
const bets = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BET:
      return { ...state, bets: [...state.bets, ...action.payload] };
    default:
      return state;
  }
};

export default bets;
