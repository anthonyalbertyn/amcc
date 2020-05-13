import React from "react";
import NumberBoard from "./components/NumberBoard";
import { createUseStyles } from "react-jss";
import "antd/dist/antd.css";

const useStyles = createUseStyles({
  heading: {
    composes: "banner-text",
    color: "white",
    textAlign: "center",
    paddingBottom: "1.4rem",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className="app">
      <div className={classes.heading}>Keno</div>
      <NumberBoard />
    </div>
  );
};

export default App;
