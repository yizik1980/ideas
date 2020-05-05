/** @format */

import React from "react";
import "./App.css";
import Labyrinth from "./frame/labyrinth";
import gloctionInpt from "./location/gloctionInput";

function App() {
  return (
    <div className="banga">
      <Labyrinth></Labyrinth>
      <gloctionInpt value="מציאת מיקום"></gloctionInpt>
    </div>
  );
}

export default App;
