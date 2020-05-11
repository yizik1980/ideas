/** @format */

import React, { Component } from "react";
import Step from "./step";
import StepUi from "./StepComponent";

export default class Labyrinth extends Component {
  cubes = [];
  componentWillMount() {
    let ends, current;
    for (let i = 0; i < 100; i++) {
      const stepCube = new Step(i);
      if (i === 0) {
        current = stepCube;
      }
      if (i === 99) {
        ends = stepCube;
      }
      stepCube.init();
      this.cubes.push(stepCube);
    }
    current.classSet += "marked";
    let diving = 9,
      left = 9;
    while (current !== ends) {
      let rand = Math.floor(Math.random() * 2);

      if (rand && diving > 0) {
        diving--;
        current = this.findStep(current.x + 1, current.y);
      } else if (left > 0) {
        left--;
        current = this.findStep(current.x, current.y + 1);
      }
      if (current.message) {
        console.log(current.message);
        break;
      } else {
        current.classSet += " marked";
      }
    }

    this.setState({ cubes: this.cubes });
  }

  findStep(x, y) {
    const filtered = this.cubes.filter((v) => {
      return x === v.x && y === v.y;
    });
    if (filtered.length > 0) {
      return filtered[0];
    }
    return { message: "exit on" + x + " " + y };
  }

  render() {
    return (
      <div className="frame">
        <div className="border-top"></div>
        <div className="border-left"></div>
        <div className="border-right"></div>
        <div className="border-bottom"></div>
        {this.state.cubes.map((s) => (
          <StepUi step={s} key={s.index} />
        ))}
      </div>
    );
  }
}
