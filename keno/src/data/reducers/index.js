import { combineReducers } from "redux";
import bets from "./bets";
import analytics from "./analytics";
import settings from "./settings";

export default combineReducers({ analytics, bets, settings });
