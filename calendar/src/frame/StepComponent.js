/** @format */

import React from "react";
export default class StepUi extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = {};
    this.state.step = props.step;
    this.setCube = this.setCube.bind(this);
  }
  setCube() {
    this.state.step.setStep();
    this.setState({});
  }
  render() {
    return (
      <div
        onClick={this.setCube}
        className={this.state.step.classSet}
        title={this.state.step.title}
      ></div>
    );
  }
}
