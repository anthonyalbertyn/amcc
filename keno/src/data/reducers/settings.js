import { ADD_SETTING } from "../actionTypes";

const defaultState = {
  settings: {
    popularStakes: [],
  },
};
const settings = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_SETTING:
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
};

export default settings;
