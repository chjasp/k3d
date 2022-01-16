import React from 'react';
import { Link } from "react-router-dom";
import kreationLogo from '../../../logo.svg';
import './footer.css';

const Footer = () => (
  <div className="kreation__footer section__padding">
    <div className="kreation__footer-heading">
      <h1 className="gradient__text">Let us find what you want.</h1>
    </div>

    <div className="kreation__footer-links">
      <div className="kreation__footer-links_logo">
        <img src={kreationLogo} alt="kreation_logo" />
        <p>Dietz-Jasper-Rüger GbR <br /> Milbertshofener Str. 7B <br /> 80807 Munich <br /> Germany </p>
      </div>
      <div className="kreation__footer-links_div">
        <h4>Links</h4>
        <p><Link to="/impressum" style={{ textDecoration: "none" }}>Impressum</Link></p>
      </div>
      <div className="kreation__footer-links_div">
        <h4>Get in touch</h4>
        <p>contact@kreation.ai</p>
      </div>
    </div>

    <div className="kreation__footer-copyright">
      <p>@2022 KREATION. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
