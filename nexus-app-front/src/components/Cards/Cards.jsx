import React from "react";
import "./Cards.css";
import Card from "../Card/Card";

const Cards = () => {
  const cardsData = [
    {
      title: "Trama",
      color: {
        backGround: "#494848",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 98,
      value: "Death Note",
    },
    {
      title: "Calidad de Animacion",
      color: {
        backGround: "#494848",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 81,
      value: "Kimetsu No Yaiba",
    },
    {
      title: "Popularidad",
      color: {
        backGround: "#494848",
        boxShadow: "0px 10px 20px 0px #F9D59B",
        progressColor: "red",
      },
      barValue: 60,
      value: "Naruto",
    },
  ];

  return (
    <div className="Cards">
      {cardsData.map((card, id) => (
        <div className="parentContainer" key={id}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
