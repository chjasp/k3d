import React from "react";
import {
  Footer,
  Features,
  WhatKreation,
  Header,
} from "./landingpage/containers";
import { Navbar, Impressum } from "./landingpage/components";
import MainApp from "./main-app/MainApp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

const LandingPage = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />

        <Header />
      </div>
      <WhatKreation />
      <Features />
      <Footer />
    </div>
  );
};

const MainWrapped = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <MainApp />
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/shopverse" element={<MainWrapped />} />
      <Route exact path="/impressum" element={<Impressum />} /> 
    </Routes>
  </Router>
);

export default App;
