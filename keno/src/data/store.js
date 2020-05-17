import { createStore } from "redux";
import rootReducer from "./reducers";

export const configureStore = () => {
  const initialState = {
    analytics: [],
    bets: [],
    settings: {
      popularStakes: [1, 2, 5, 10, 20],
    },
  };
  /* eslint-disable no-underscore-dangle */
  const store = createStore(rootReducer, initialState);
  /* eslint-enable */
  return store;
};
