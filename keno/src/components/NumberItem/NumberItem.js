import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  numberItem: {
    composes: "number-block",
    boxSizing: "border-box",
    width: "90px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  numberItemRed: {
    composes: ["$numberItem", "red-block"],
  },
  numberItemBlue: {
    composes: ["$numberItem", "blue-block"],
  },
  numberItemActive: {
    composes: ["$numberItem", "green-block"],
    fontSize: "3.4375rem",
  },
  numberItemLabel: {
    paddingBottom: "0.275rem",
  },
});

const NumberItem = ({ id, label, color, isActive, onClick = () => {} }) => {
  const classes = useStyles();

  let numberItemClass =
    color === "red" ? classes.numberItemRed : classes.numberItemBlue;

  if (isActive) {
    numberItemClass = classes.numberItemActive;
  }

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div onClick={handleClick} className={numberItemClass} id={id}>
      <div className={classes.numberItemLabel}>{label}</div>
    </div>
  );
};

export default NumberItem;
