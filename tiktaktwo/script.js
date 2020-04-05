/** @format */

var dialogBox = function(messageText, centerText) {
  this.dialog = document.createElement("div");
  this.dialog.classList.add("dialog");
  const div = document.createElement("div");
  div.classList.add("container");
  const h2 = document.createElement("h2");
  h2.innerHTML = messageText || "";
  div.appendChild(h2);
  if (centerText) {
    const h1 = document.createElement("h1");
    h1.innerHTML = centerText || "";
    div.appendChild(h1);
  }

  this.btn = document.createElement("button");
  this.btn.innerHTML = "התחל מחדש";
  this.btn.type = "button";
  div.appendChild(this.btn);
  this.dialog.appendChild(div);
};
dialogBox.prototype.setBtn = function(btnText, method) {
  this.btn.innerHTML = btnText || "התחל מחדש";
  if (method) {
    this.btn.addEventListener("click", method);
  }
};
dialogBox.prototype.show = function() {
  document.body.appendChild(this.dialog);
};
var tiktaktow = function() {
  this.parent = document.querySelector(".frame");

  this.cubes = new Set(); //document.querySelectorAll(".cube");

  this.types = ["x", "o"];
  this.currentType = Math.round(Math.random());
  this.type = this.types[this.currentType];
  this.parent.classList.add(this.type);
  this.choosenCubes = {
    x: [],
    o: [],
  };
  this.isItOverob = {
    isfinished: false,
  };
  let steps = 0;
  this.swapType = i => {
    this.parent.classList.remove("o");
    this.parent.classList.remove("x");
    steps++;
    this.choosenCubes[this.type].push(i);
    this.choosenCubes[this.type].sort();
    if (steps > 3) {
      this.validation();
    }

    if (!this.isItOverob.isfinished) {
      this.currentType = this.currentType ? 0 : 1;
      this.type = this.types[this.currentType];
      this.parent.classList.add(this.type);
    } else {
      let dialog = new dialogBox(`המנצח הוא`, this.type.toUpperCase());
      dialog.setBtn("להתחיל מחדש", () => {
        location.reload();
      });
      dialog.show();
    }
  };
  this.validation = function() {
    const arr = this.choosenCubes[this.type];
    for (let i = 0; i < this.alloption.length; i++) {
      let currentArr = this.alloption[i];
      const found = currentArr.every(r => arr.indexOf(r) >= 0);
      console.log(found, arr, currentArr);
      if (found) {
        this.isItOverob[this.type] = arr;
        this.isItOverob.isfinished = true;
        return;
      }
    }
  };
  this.clickcube = function(e) {
    var target = e.target;
    target.classList.remove("o");
    target.classList.remove("x");
    target.classList.add(this.type);
    let i = parseInt(target.dataset.index);
    this.swapType(i);
  };
  this.alloption = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 9; i++) {
    let cube = document.createElement("div");
    cube.classList.add("cube");
    cube.dataset.index = i;
    cube.addEventListener("click", this.clickcube.bind(this), {
      once: true,
    });
    this.parent.appendChild(cube);
    this.cubes.add({ index: i, cube });
  }
};
var t = new tiktaktow();
