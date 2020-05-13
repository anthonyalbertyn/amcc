import React from "react";
import { connect } from "react-redux";
import { addBet, addAnalytics } from "../../data/actionCreators";
import { getSettings } from "../../data/selectors";

import NumberItem from "../NumberItem";

const NumberBoard = ({ settings }) => {
  const message = "Number board";
  return (
    <>
      <p>{message}</p>
      <NumberItem />
      {console.log(settings.popularStakes)}
    </>
  );
};

const mapStateToProps = (state, _) => {
  return {
    settings: getSettings(state),
  };
};

const mapDispatchToProps = { addBet, addAnalytics };

export default connect(mapStateToProps, mapDispatchToProps)(NumberBoard);
