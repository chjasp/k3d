import React from 'react';
import { Link } from "react-router-dom";
import './header.css';

const Header = () => (
  <div className="kreation__header section__padding" id="home">
    <div className="kreation__header-content">
      <h1 className="gradient__text">Let&apos;s Make Online Shopping Smart.</h1>
      <p>There are over 50,000 sneakers you could buy online. Who can guarantee you that you&apos;ll buy <b>THE ONE</b> for you? Nobody, but using <b>SSI</b> comes pretty close to a guarantee.
      </p>

      <div className="kreation__header-content__input">
        <button type="button"><Link to="/shopverse" style={{ textDecoration: "none" }}>SSI Sneaker Store</Link></button>
      </div>

    </div>

    <div className="kreation__header-image">
      <img className="top" src="./assets/landingpage/ssi_top.JPG" />
      <img className="bottom" src="./assets/landingpage/ssi_bottom.JPG" />
    </div>
  </div>
);

export default Header;
