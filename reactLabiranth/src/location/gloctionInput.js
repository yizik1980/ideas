/** @format */

import React from "react";

export default class gloctionInpt extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    navigator.geolocation.getCurrentPosition(
      (successRes) => {
        console.log(successRes);
      },
      (errorRes) => {
        console.log(errorRes);
      },
    );
  }
  render() {
    return (
      <div className="inputwrap">
        <input type="text" placeholder={this.props.value} />
      </div>
    );
  }
}
