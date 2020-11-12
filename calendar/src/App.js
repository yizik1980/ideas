/** @format */

import React from "react";
import Layout from "./layout/layout";
import Home from "./layout/home";
import "./style.css";

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <div className="container relative flex center">
    <div className="pack"></div>
      <Home></Home>
      <Layout></Layout>
    </div>
    );
  }
}

