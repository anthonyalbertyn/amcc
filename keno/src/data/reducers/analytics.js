import { ADD_ANALYTICS } from "../actionTypes";

const defaultState = {
  analytics: [],
};
const analytics = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ANALYTICS:
      return { ...state, analytics: [...state.analytics, ...action.payload] };
    default:
      return state;
  }
};

export default analytics;
