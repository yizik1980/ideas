/** @format */

import React, { Component } from "react";
import "./App.css";
//import Labyrinth from "./frame/labyrinth";
import Calendar from "./calendar/Calendar";
import * as fireBase from "firebase";
import Popup from "./popup/Popup";
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
fireBase.initializeApp(firebaseConfig);
class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      showPopup: false,
      d: {},
    };
    this.clickCalendar = this.clickCalendar.bind(this);
  }
  componentDidMount() {
    const fireDatabase = fireBase.database();
    const ref = fireDatabase.ref();
    const DataRef = ref.child("title");
    console.log(fireDatabase);
    console.log(DataRef);
    DataRef.on("value", (val) => {
      console.log(val.val());
      let title = val.val();
      this.setState({
        title,
      });
    });
  }
  clickCalendar(d) {
    const show = !this.state.showPopup;
    this.setState({
      d,
      showPopup: show,
    });
  }
  render() {
    return (
      <div className="banga">
        {/* <Labyrinth></Labyrinth> */}
        <h2>{this.state.title}</h2>
        <Calendar clickCalendarDay={this.clickCalendar} />
        <Popup show={this.state.showPopup} date={this.state.d}></Popup>
      </div>
    );
  }
}

export default App;
