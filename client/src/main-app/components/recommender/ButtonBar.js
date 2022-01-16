import React from "react";
import { FaHeart } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { AiFillStar } from 'react-icons/ai'
import "./ButtonBar.css";

const ButtonBar = ({ id, handleChoice }) => {
  return (
    <div className="btn-wrapper">
      <button
        className="dislike"
        type="button"
        onClick={() => handleChoice(id, "ADD_TO_DISLIKED_PRODUCTS")}
      >
        <ImCross className="cross" />
      </button>
      <button
        className="superlike"
        type="button"
        onClick={() => handleChoice(id, "ADD_TO_SUPERLIKED_PRODUCTS")}
      >
        <AiFillStar className="star"/>
      </button>
      <button
        className="like"
        type="button"
        onClick={() => handleChoice(id, "ADD_TO_LIKED_PRODUCTS")}
      >
        <FaHeart className="heart" />
      </button>
    </div>
  );
};

export default ButtonBar;
