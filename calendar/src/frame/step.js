/** @format */

export default class Step {
  constructor(i) {
    let amount = 10;
    this.index = parseInt(i);
    this.x = Math.floor(this.index / amount);
    this.y = this.index % amount;
    this.isRightSide = this.y === amount - 1;
    this.isBottomSide = this.x === amount - 1;
    this.isTopSide = this.x === 0;
    this.isLeftSide = this.y === 0;
    this.title = `x:${this.x},y:${this.y}`;
    this.markedCube = false;
  }
  init(prevClass) {
    let types = ["b-top", "b-bottom", "b-left", "b-right"];
    this.prevClass = types[Math.floor(Math.random() * types.length)];
    this.classSet = `${this.prevClass} cube `;
  }
  setStep() {
    console.log(this);
    this.markedCube = !this.markedCube;
    if (this.markedCube) {
      this.classSet += " steped";
    } else {
      this.classSet = this.classSet.replace(/\s+steped/g, "");
    }
  }
}
