/** @format */

import React, { Component } from "react";
import { HDate } from "hebcal";
import { DateLetter, MonthNames, DaysLetter, HbMonthNames } from "./DateCommon";
import "./calendar.css";

export default class Calendar extends Component {
  constructor(props) {
   // super(props);
    this.currentDateTime = new Date();
    this.daysOftheMonth = [];
    this.state = {
      daysOftheMonth: [],
    };
    this.state.date = new Date();
    this.state.hDate = new HDate(new Date());
    this.state.month = this.state.date.getMonth();
    this.state.year = this.state.date.getFullYear();
    this.init();
    this.nextMonth = this.nextMonth.bind(this);
    this.pervMonth = this.pervMonth.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
  }
  init() {
    this.state.daysOftheMonth = [];
    this.state.hDate = new HDate(
      new Date(this.state.year, this.state.month, 0),
    );
    let dayInMonth = 1,
      cubeCounter = 1;
    while (dayInMonth <= 31) {
      let d = new Date(this.state.year, this.state.month, dayInMonth);
      if (dayInMonth === 1) {
        let dayinTheweek = d.getDay();
        while (cubeCounter <= dayinTheweek) {
          let dOb = {
            key: cubeCounter,
            day: "",
          };
          this.state.daysOftheMonth.push(dOb);
          cubeCounter++;
        }
      } else {
        cubeCounter++;
      }

      if (this.state.month !== d.getMonth()) {
        break;
      }
      let hd = new HDate(d);
      let today = new Date();
      let dOb = {
        key: cubeCounter,
        d,
        day: d.getDate(),
        hd: DateLetter[hd.day - 1],
        today:
          today.getMonth() === d.getMonth() &&
          today.getDate() === d.getDate() &&
          today.getFullYear() === d.getFullYear(),
      };
      this.state.daysOftheMonth.push(dOb);
      dayInMonth++;
    }
  }
  nextMonth() {
    if (this.state.month === 11) {
      this.state.month = 0;
    } else {
      this.state.month += 1;
    }
    this.init();
    this.setState({});
  }
  pervMonth() {
    if (this.state.month === 0) {
      this.state.month = 11;
    } else {
      this.state.month -= 1;
    }
    this.init();
    this.setState({});
  }
  nextYear() {
    this.state.year += 1;
    this.init();
    this.setState({});
  }
  prevYear() {
    this.state.year -= 1;
    this.init();
    this.setState({});
  }
  ShowCalendar() {
    this.state.show = !this.state.show;
  }
  render() {
    return (
      <div className="calendar">
        <div className="calendar-kit">
          <div className="tube">
            <button
              type="button"
              className="next icono-caretLeft"
              onClick={this.nextMonth}
            />
            <p>
              {MonthNames[this.state.month]}/
              {HbMonthNames[this.state.hDate.month - 1]}
            </p>
            <button
              type="button"
              className="prev icono-caretRight"
              onClick={this.pervMonth}
            />
          </div>{" "}
          <div className="tube">
            <button
              type="button"
              className="next icono-caretLeft"
              onClick={this.nextYear}
            />
            <p>{this.state.year}</p>
            <button
              type="button"
              className="prev icono-caretRight"
              onClick={this.prevYear}
            />
          </div>
        </div>
        <div className="wrap-calendar">
          {DaysLetter.map((v, k) => {
            return (
              <div className="letter" key={k}>
                {v}
              </div>
            );
          })}
          {this.state.daysOftheMonth.map((d) => {
            return (
              <div className={d.today ? "today day" : "day"} key={d.key}>
                <span className="ld">{d.day}</span>
                <span className="hd"> {d.hd}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
