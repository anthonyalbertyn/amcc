import React, { useState } from "react";
import { connect } from "react-redux";
import { addBet, addAnalytics } from "../../data/actionCreators";
import { getSettings } from "../../data/selectors";
import NumberItem from "../NumberItem";
import { createUseStyles } from "react-jss";
import { Button, InputNumber } from "antd";
import {
  DeleteOutlined,
  PoundCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const useStyles = createUseStyles({
  numberBoard: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "1rem",
  },
  stakeWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "700px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  stakeItem: {
    composes: "red-text",
    margin: "0.5rem",
    minWidth: "90px",
  },
  luckyWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "700px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  messageWrapper: {
    composes: ["$luckyWrapper", "message-text"],
    marginBottom: "1rem",
  },
  luckyItem: {
    margin: "0.5rem",
  },
  placeBetItem: {
    margin: "0.5rem",
    minWidth: "200px",
  },
});

const NumberBoard = ({ settings }) => {
  const [selected, setSelected] = useState({});
  const [stake, setStake] = useState();
  const [message, setMessage] = useState("");

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
    if (message) {
      setMessage("");
    }
  };

  const pickRandomNumber = () => {
    const min = 1;
    const max = 80;
    return min + Math.random() * (max - min);
  };

  const generateLuckyPickNumbers = () => {
    const numbers = [];
    const pickNumber = () => {
      if (numbers.length < 5) {
        const randomNumber = Math.round(pickRandomNumber());
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
        pickNumber();
      } else {
        return;
      }
    };
    pickNumber();
    return numbers;
  };

  const handleStakeChange = (value) => {
    setStake(value);
  };

  const handleStakeButtonClick = (index) => {
    const key = parseInt(index, 10);
    setStake(settings.popularStakes[key]);
  };

  const handleClearBoardClick = () => {
    setStake();
    setSelected({});
    setMessage("");
  };

  const handleLuckyPickClick = () => {
    const numbers = generateLuckyPickNumbers();
    const selectedNew = {};
    numbers.forEach((item) => {
      const key = item.toString();
      selectedNew[key] = true;
    });
    setSelected(selectedNew);
    if (message) {
      setMessage("");
    }
  };

  const announceWin = () => {
    setMessage("You are a winner !!!");
  };

  // idea behind this function, credit to:
  // https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
  const numberOfDecimalPlaces = (number) => {
    let numberDecimals = 0;
    if (Math.floor(number) !== number) {
      numberDecimals = number.toString().split(".")[1].length || 0;
    }
    return numberDecimals;
  };

  const handlePlaceBetClick = () => {
    const numbersPicked = Object.keys(selected) || [];
    if (numbersPicked.length > 5) {
      setMessage("You may only pick 5 numbers");
      return;
    }
    if (numbersPicked.length === 0) {
      setMessage("You must pick at last one number");
      return;
    }
    if (!stake) {
      setMessage("You need to set a stake");
      return;
    }
    if (numberOfDecimalPlaces(parseFloat(stake)) > 2) {
      setMessage("Stake value may not exceed two decimal places");
      return;
    }
    announceWin();
    setStake();
    setSelected({});
  };

  return (
    <>
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
      {message && <div className={classes.messageWrapper}>{message}</div>}
      <div className={classes.stakeWrapper}>
        {settings.popularStakes.length > 1 &&
          settings.popularStakes.map((value, index) => {
            const id = value.toString() + "-button";
            const label = " " + value.toString();
            return (
              <Button
                id={id}
                key={id}
                className={classes.stakeItem}
                icon={<PoundCircleOutlined />}
                size="large"
                onClick={() => handleStakeButtonClick(index)}
              >
                {label}
              </Button>
            );
          })}
        <InputNumber
          id="stake"
          className={classes.stakeItem}
          autoFocus
          size="large"
          min={0}
          max={10000}
          placeholder="Stake"
          value={stake}
          onChange={(value) => handleStakeChange(value)}
        />
      </div>
      <div className={classes.luckyWrapper}>
        <Button
          id="luckyPick"
          className={classes.luckyItem}
          icon={<StarOutlined />}
          size="large"
          onClick={handleLuckyPickClick}
        >
          Lucky Pick
        </Button>
        <Button
          id="clearBoard"
          className={classes.luckyItem}
          icon={<DeleteOutlined />}
          size="large"
          onClick={handleClearBoardClick}
        >
          Clear board
        </Button>
      </div>
      <div className={classes.luckyWrapper}>
        <Button
          id="placeBet"
          className={classes.placeBetItem}
          type="primary"
          size="large"
          onClick={handlePlaceBetClick}
        >
          Place Bet
        </Button>
      </div>
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
