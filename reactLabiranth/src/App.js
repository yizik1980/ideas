/** @format */

import React, { Component } from "react";
import "./App.css";
//import Labyrinth from "./frame/labyrinth";
import Calendar from "./calendar/Calendar";
import * as fireBase from "firebase";
import Popup from "./popup/Popup";
const firebaseConfig = {
  apiKey: "AIzaSyBVTENQnCiMNxX-JBGlpp8gPLu2VI4fLTk",
  authDomain: "tutrial-1493211707260.firebaseapp.com",
  databaseURL: "https://tutrial-1493211707260.firebaseio.com",
  projectId: "tutrial-1493211707260",
  storageBucket: "tutrial-1493211707260.appspot.com",
  messagingSenderId: "873204913850",
  appId: "1:873204913850:web:86d2450e92d5af23a99483",
  measurementId: "G-FGJE0GLF9N",
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
