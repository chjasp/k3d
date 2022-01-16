import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../../logo.svg';
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="kreation__navbar">
      <div className="kreation__navbar-links">
        <div className="kreation__navbar-links_logo">
          <img src={logo} style={{ height: 53, width: 120 }} alt="KREATION" />
        </div>
        <div className="kreation__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#wkreation">What is SSI?</a></p>
          <p><a href="#features">Case Studies</a></p>
          <p><a><Link to="/ssi" style={{ textDecoration: "none" }}>Sneaker Store</Link></a></p>
        </div>
      </div>
      <div className="kreation__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="kreation__navbar-menu_container scale-up-center">
          <div className="kreation__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#wkreation">What is SSI?</a></p>
            <p><a href="#features">Case Studies</a></p>
            <p><a><Link to="/ssi" style={{ textDecoration: "none" }}>Sneaker Store</Link></a></p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
