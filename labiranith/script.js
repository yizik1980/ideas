/** @format */
class Step {
  constructor(i) {
    let fType = ["b-bottom", "b-right"];
    let lType = ["b-top", "b-right"];
    let lastType = ["b-top", "b-left"];
    let types = ["b-top", "b-bottom", "b-left", "b-right"];
    let toptypes = ["b-bottom", "b-left", "b-right"];
    let bottomtypes = ["b-top", "b-left", "b-right"];
    let rightTypes = ["b-top", "b-bottom", "b-left"];
    let leftTypes = ["b-top", "b-bottom", "b-right"];
    this.index = i;
    this.cube = document.createElement("div");
    this.x = Math.floor(i / 10);
    this.y = i % 10;
    this.isRightSide = this.x === 9;
    this.isLeftSide = this.x === 0;
    this.isTopSide = this.y === 0;
    this.isBottomSide = this.y === 9;
    this.cube.title = `x: ${this.x} y: ${this.y}`;
    let className;

    if (this.isLeftSide) {
      if (this.y == 0) {
        //className = " ";
      } else if (this.y == 9) {
        className = lastType[Math.floor(Math.random() * 2)];
      } else {
        className = toptypes[Math.floor(Math.random() * toptypes.length)];
      }
    } else if (this.isBottomSide) {
      if (this.y == 0) {
        className = lType[Math.floor(Math.random() * 2)];
      } else if (this.y == 9) {
        className = lastType[Math.floor(Math.random() * 2)];
      } else {
        className = bottomtypes[Math.floor(Math.random() * bottomtypes.length)];
      }
    } else if (this.isTopSide) {
      className = leftTypes[Math.floor(Math.random() * leftTypes.length)];
    } else if (this.isBottomSide) {
      className = rightTypes[Math.floor(Math.random() * rightTypes.length)];
    } else {
      className = types[Math.floor(Math.random() * types.length)];
    }
    this.cube.classList.add(className);
  }
}

class labiranet {
  constructor() {
    this.cubes = [];
    this.path = [];
    this.frame = document.querySelector(".frame");
    for (let i = 0; i < 100; i++) {
      const stepCube = new Step(i);
      this.frame.appendChild(stepCube.cube);
      this.cubes.push(stepCube);
    }
    this.start = this.cubes[0];
    this.last = this.cubes[99];
    let current = this.start;
    current.cube.classList.add("marked");
    while (current != this.last) {
      let rand = Math.floor(Math.random() * 2);
      if (current.isLeftSide) {
        current = this.findStep(current.x + 1, current.y);
      } else if (current.isRightSide) {
        current = this.findStep(current.x, current.y + 1);
      } else if (current.isTopSide) {
        current = this.findStep(current.x, current.y + 1);
      } else {
        if (rand) {
          current = this.findStep(current.x, current.y + 1);
        } else {
          current = this.findStep(current.x + 1, current.y);
        }
      }
      if (current.message) {
        console.log(current.message);
        break;
      } else {
        current.cube.classList.add("marked");
      }
    }
  }

  findStep(x, y) {
    //  if (step instanceof Step)
    const filtered = this.cubes.filter((v) => {
      return x == v.x && y == v.y;
    });
    if (filtered.length > 0) {
      return filtered[0];
    }
    return { message: "exit on" + x + " " + y };
    // }
  }
}
let labOb = new labiranet();
