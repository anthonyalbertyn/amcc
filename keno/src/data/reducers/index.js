import { combineReducers } from "redux";
import bets from "./bets";
import analytics from "./analytics";

export default combineReducers({ bets, analytics });
