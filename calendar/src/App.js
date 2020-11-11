/** @format */

import React from "react";
import Layout from "./layout/layout";
import Home from "./layout/home";
import "./style.css";


function App() {
  return (
    <div className="container relative flex center">
    <div className="pack"></div>
      <Home></Home>
      <Layout></Layout>
    </div>
  );
}

export default App;
