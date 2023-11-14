import React from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = (props) => {
  return (
    <div className="CompactCard" style={{ background: props.color.backGround }}>
      <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
          text={`${props.barValue}%`}
        />
        <span>{props.title}</span>
        <p>{props.value}</p>
      </div>
    </div>
  );
};

export default Card;
