import React from "react";
import "./feature.css";

const imgs = [
  "./assets/landingpage/ssi_top.JPG",
  "./assets/landingpage/ssi_map.JPG",
  "./assets/landingpage/ssi_bottom.JPG",
];

const Feature = ({ title, text, mode }) => {
  const pStyle = mode === "dark" ? "var(--color-subtext)" : "white";

  return (
    <div className="kreation__features-container__feature">
      <div className="kreation__features-container__feature-title">
        <div />
        <h1>{title}</h1>
      </div>
      <div className="kreation__features-container_feature-text">
        <p style={{ color: pStyle }}>{text}</p>
      </div>
    </div>
  );
};

const ImgFeature = ({ title, text, mode, id }) => {
  const pStyle = mode === "dark" ? "var(--color-subtext)" : "white";

  return (
    <div className="kreation__features-container__feature">
      <div className="feature-img-wrapper">
        <img className="feature-img" src={imgs[id]} alt="ssi_img" />
      </div>
      <div className="kreation__features-container__feature-title">
        <div />
        <h1>{title}</h1>
      </div>
      <div className="kreation__features-container_feature-text">
        <p style={{ color: pStyle }}>{text}</p>
      </div>
    </div>
  );
};

export { Feature, ImgFeature };
