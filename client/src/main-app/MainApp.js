import { useState } from "react"
import Verse from "./components/verse/Verse";
import "./MainApp.css";

const MainApp = () => {
  const [position, setPosition] = useState([1000,1000])

  return (
    <div className="main-app">
        <Verse/>
    </div>
  );
};

export default MainApp;
