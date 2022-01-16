import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Data } from "../../Data";
import "./Bottom.css";

const Bottom = ({
  currentId,
  currentLikes,
  currentDislikes,
  currentSuperlikes,
  setHighlight,
  setOpenModal,
}) => {
  const [bestFive, setBestFive] = useState([]);
  const [frontBack, setFrontBack] = useState(true);
  const [mode, setMode] = useState("bestFive");

  const handleClick = (e, link) => {
    switch (e.detail) {
      case 1:
        break;
      case 2:
        window.open(link);
        break;
      default:
        return;
    }
  };

  const highlight = () => {
    setHighlight(Data[currentId].feats)
    setOpenModal(false)
  }

  const turn = (passedMode) => {
    setMode(passedMode);
    setFrontBack((front) => !front);
  };

  const closestFive = async () => {
    turn("bestFive");
    const uploadData = new FormData();
    uploadData.append("id", currentId);

    let resp = await fetch("https://krea-3iudqfigrq-ey.a.run.app/closestfive/", {
      method: "POST",
      body: uploadData,
    });
    let respJSON = await resp.json();
    setBestFive(respJSON["closest_idxs"]);
  };

  const renderSwitch = () => {
    switch (mode) {
      case "bestFive":
        return bestFive;
      case "likes":
        let allLikes = currentLikes.concat(currentSuperlikes);
        return allLikes;
      case "dislikes":
        return currentDislikes;
    }
  };

  let personalization = Math.min(
    currentLikes.length * 2 +
      currentDislikes.length * 1 +
      currentSuperlikes.length * 5,
    100
  );

  return (
    <div className="bottom-outer">
      <ReactCardFlip
        isFlipped={frontBack}
        flipDirection="horizontal"
        className="bottom-card"
      >
        <div className="shoeshow">
          <button
            className="show-back-btn"
            onClick={() => setFrontBack(!frontBack)}
          >
            <p>BACK</p>
          </button>
          {renderSwitch().map((shoeId) => {
            return (
              <img
                className="pic"
                onClick={(e) => handleClick(e, Data[shoeId].link)}
                src={`./assets/main-app/shoes/${shoeId}.jpg`}
              />
            );
          })}
        </div>
        <div className="bottom-complete">
          <div className="progress-header">
            <p
              style={{
                background: `linear-gradient(90deg,rgba(252, 58, 129, 1) 0%,rgba(146, 171, 226, 1) ${
                  personalization * 1.3
                }%)`,
              }}
            >
              PERSONALIZATION
            </p>
          </div>
          <div className="bottom-button-wrapper">
            <div className="bottom-personal">
              <button className="bottom-likes" onClick={() => turn("likes")}>
                LIKES
              </button>
              <button
                className="bottom-dislikes"
                onClick={() => turn("dislikes")}
              >
                DISLIKES
              </button>
            </div>
            <div className="bottom-similar">
              <button className="ctrl-btn" onClick={() => closestFive()}>
                DOPPELGÄNGER
              </button>
              <button className="ctrl-btn" onClick={() => highlight()}>
                LOCATION
              </button>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Bottom;
