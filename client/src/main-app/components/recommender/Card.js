import React from "react";
import ButtonBar from "./ButtonBar";
import "./Card.css";

const Card = ({ id, handleChoice }) => {
  return (
    <div className="card-wrapper">
      <img className="pic-front" src={`./assets/main-app/shoes/${id}.jpg`} />
      <ButtonBar id={id} handleChoice={handleChoice} />
    </div>
  );
};

export default Card;
