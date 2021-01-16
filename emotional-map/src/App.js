

import React from "react";
import Navbar from './Components/Navbar'

import "./styles.css";

import MapChart from "./MapChart";

function App() {
  return (
    <div className="page">
      <Navbar />
      {useIsLarge ? <ComputerView /> : <MobileView />}
    </div>
  );
}

export default App;



