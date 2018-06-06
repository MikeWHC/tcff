import React, { Component } from 'react';
import "../sass/time.scss";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      // currentDay:'',
      uniqueDate:[],
      uniqueDateAll: [],
      // uniqueDay: [],
      uniqueDateDay: [],
      currentDate:'',
      currentInx:0,
      currentDay:'',
    };
    this.createUniqueDate = this.createUniqueDate.bind(this);
    this.nextDate = this.nextDate.bind(this);  
    
    // this.datePick = this.datePick.bind(this);
    // this.findCurrentDay = this.findCurrentDay.bind(this);
  }

  createUniqueDate(){
    // console.log("createUniqueDate");
    let dateArr = [];
    let dateAllArr = [];
    // let dayArr = [];
    let dateDayArr = [];
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.state.data.map(session =>{
      // dateArr.push(`${session.date.slice(5, 10).replace('-', '/')} ${session.day}`);
      dateArr.push(`${session.date.slice(5,10)}`);
      dateAllArr.push(`${session.date}`);
      // dayArr.push(`${session.day}`);
      dateDayArr.push(`${session.date} ${session.day}`);
    })
    let uniqueDateArr = dateArr.filter(onlyUnique);
    let uniqueDateAllArr = dateAllArr.filter(onlyUnique);
    // let uniqueDayArr = dayArr.filter(onlyUnique);
    let uniqueDateDayArr = dateDayArr.filter(onlyUnique);

    let currentDay = new Date(this.state.uniqueDate[this.state.currentInx]).getDay();
    let currentDayStr;
    console.log(this.state.uniqueDate[this.state.currentInx]);
    switch (currentDay) {
      case 0:
        currentDayStr = "Sun";
        break;
      case 1:
        currentDayStr = "Mon";
        break;
      case 2:
        currentDayStr = "Tue";
        break;
      case 3:
        currentDayStr = "Wed";
        break;
      case 4:
        currentDayStr = "Thu";
        break;
      case 5:
        currentDayStr = "Fri";
        break;
      case 6:
        currentDayStr = "Sat";
        break;
    }

    this.setState({
      uniqueDate: uniqueDateArr,
      uniqueDateAll: uniqueDateAllArr,
      // uniqueDay: uniqueDayArr,
      uniqueDateDay: uniqueDateDayArr,
      currentDate: uniqueDateDayArr[0],
      currentDay: currentDayStr,
    });
  }

  datePick(date){
    let currentDate = `2018-${date.replace('/', '-')}`;
    this.setState({
      currentDate: currentDate,
    })
    // console.log(currentDate);
    // console.log(this.state.currentDate);
  }

  nextDate(){
    let currentInx = this.state.currentInx;
    currentInx=(currentInx+1)%14;
    this.setState({
      currentInx: currentInx,
    })
    console.log(this.state.currentInx);
  }


  findCurrentDay() {
    let currentDateStrAll = this.state.currentDate;
    let currentDay = new Date(currentDateStrAll).getDay();
    let currentDayStr;
    console.log(currentDay);
    switch (currentDay) {
      case 0:
        currentDayStr = "Sun"
        break;
      case 1:
        currentDayStr = "Mon"
        break;
      case 2:
        currentDayStr = "Tue"
        break;
      case 3:
        currentDayStr = "Wed"
        break;
      case 4:
        currentDayStr = "Thu"
        break;
      case 5:
        currentDayStr = "Fri"
        break;
      case 6:
        currentDayStr = "Sat"
        break;
    }
    this.setState({
      currentDay: currentDayStr,
    })
    console.log(this.state.currentDay);
  }
  
  componentWillMount() {
    fetch("http://192.168.39.110/tcff_php/api/movie/session.php")
      .then(res => res.json())
      .then(sessions => {
        this.setState({ data: sessions });
      });
    window.addEventListener("load", this.createUniqueDate, false);
    // window.addEventListener("load", this.findCurrentDay, false);
  }

  componentDidMount(){

  }

  render() {
    return <section className="container-time">
        <div className="date-pick-wrap">
          {this.state.uniqueDate.map(date=>{
          return <div className="date-picker" key={date.id} onClick={this.datePick.bind(this, date)}>
              {date}
            </div>;
          })}
        </div>

        <div className="calendar">
          <div className="cal cal-left" onClick={this.nextDate}>
            <div className="cal-heading">誠品電影院</div>
            <div className="year">2018</div>
            <div className="date">{this.state.uniqueDate[this.state.currentInx]}</div>
            <div className="day">{this.state.currentDay}</div>
            {this.state.data.map(session => {
            // console.log(this.state.currentDate)
              if (session.date == this.state.uniqueDateAll[this.state.currentInx] && session.auditorium == "誠品電影院") {
                return <div key={session.id}>
                  <Link to="/" className="time-name transition">{session.time.slice(0, 5)}{"  "}{session.name_zhtw}</Link>
                </div>;
              }
            })}
          </div>
          <div className="cal cal-right" onClick={this.nextDate}>
            <div className="cal-heading">台北光點</div>
            <div className="year">2018</div>
            <div className="date">{this.state.uniqueDate[this.state.currentInx]}</div>
            <div className="day">{this.state.uniqueDateDay[this.state.currentInx]}</div>
            {this.state.data.map(session => {
              // console.log(this.state.currentDate)
              if (session.date == this.state.uniqueDateAll[this.state.currentInx] && session.auditorium == "台北光點") {
                return <div key={session.id}>
                  <Link to="/" className="time-name transition">{session.time.slice(0, 5)}{"  "}{session.name_zhtw}</Link>
                </div>;
              }
            })}
          </div>
        </div>
      </section>;
  }
}

export default Time;
