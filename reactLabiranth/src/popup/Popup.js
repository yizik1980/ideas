/** @format */

import React, { Component } from "react";
import "./Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: this.props.show ? "overlay open" : "overlay",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e);
    this.setState({
      name: e.target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render

    if (nextProps.date.date) {
      this.setState({
        showPopup: nextProps.show ? "overlay open" : "overlay",
        date: new Date(nextProps.date.date).toDateString(),
      });
    }
  }

  render() {
    return (
      <div className={this.state.showPopup}>
        <div className="popup">
          <div className="close">
            <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
          </div>
          <div className="content">
            <div className="input">{this.state.date}</div>
            <div className="input">
              <label>name:</label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
