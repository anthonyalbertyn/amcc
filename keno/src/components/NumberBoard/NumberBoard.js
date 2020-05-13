import React, { useState } from "react";
import { connect } from "react-redux";
import { addBet, addAnalytics } from "../../data/actionCreators";
import { getSettings } from "../../data/selectors";
import NumberItem from "../NumberItem";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  numberBoard: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "1rem",
  },
});

const NumberBoard = ({ settings }) => {
  const [selected, setSelected] = useState({});

  const classes = useStyles();

  const numberRange = new Array(80);
  numberRange.fill(1);

  const handleNumberItemClick = (keyString) => {
    const selectedNew = { ...selected };
    if (selectedNew[keyString]) {
      delete selectedNew[keyString];
    } else {
      selectedNew[keyString] = true;
    }
    setSelected(selectedNew);
  };

  return (
    <div className={classes.numberBoard}>
      {console.log(selected)}
      {numberRange.map((_, index) => {
        const id = index + 1;
        const color = id < 41 ? "blue" : "red";
        const idString = id.toString(10);
        const isSelected = selected[idString] ? true : false;
        return (
          <NumberItem
            id={idString}
            key={idString}
            color={color}
            label={id}
            isActive={isSelected}
            onClickCallback={handleNumberItemClick}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state, _) => {
  return {
    settings: getSettings(state),
  };
};

const mapDispatchToProps = { addBet, addAnalytics };

export default connect(mapStateToProps, mapDispatchToProps)(NumberBoard);
