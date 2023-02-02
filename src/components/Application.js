import React, { useState, useEffect } from "react";

import "./Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import axios from 'axios';

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"},
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"},
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png"},
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg"},
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg"}
];


const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  const [interviewer, setInterviewer] = useState(2);

  const onChange = (id) => {
    console.log("Fired onChange");
    setInterviewer(id);
  }

  const allAppointments = Object.values(appointments).map( appt => {
    return(
      <Appointment
        key={appt.id}
        {...appt}
      />
    )
  });

  useEffect( () => {
    axios.get('http://localhost:8001/api/days')
    .then((response) => {
      setDays(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

          
      </section>
      <section className="schedule">
        {allAppointments}
        <Appointment key="last" time="5pm" />
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={onChange}
        />  
      </section>
    </main>
    
  );
}
