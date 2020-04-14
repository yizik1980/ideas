/** @format */

import React from "react";
export default class StepUi extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = props.step;
  }
  render() {
    return (
      <div className={this.state.classSet} title={this.state.title}>
        {`${this.state.x},${this.state.y}`}
      </div>
    );
  }
}
