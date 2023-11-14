import React from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = (props) => {
  return (
    <div className="CompactCard" style={{ background: props.color.backGround }}>
      <div className="radialBar">
      <p className="title-p">{props.title}</p>
        <CircularProgressbar
          value={props.barValue}
          text={`${props.barValue}%`}
        />
        <p>{props.value}</p>
      </div>
    </div>
  );
};

export default Card;
