import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import {getAppointmentsForDay, getInterview} from 'helpers/selectors';

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png"},
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"},
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png"},
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg"},
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg"}
];

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setInterviewer = (interviewer) => setState({...state, interviewer});

  const [state, setState] = useState({
    day: "Monday",
    interviewer: 2,
    days: [],
    appointments: {},
    interviewers: []    
  });

  const onChange = (id) => setInterviewer(id);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const allAppointments = dailyAppointments.map( appt => {
    const interview = getInterview(state, appt.interview);
    return(
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
      />
    )
  });

  useEffect( () => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,interviewers: all[2].data}));
    }).catch( (err) => {
      console.log(err.message);
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
            days={state.days}
            value={state.day}
            setDay={setDay}
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
        <Appointment 
          key="last"
          time="5pm"
        />
        <InterviewerList
          interviewers={interviewers}
          value={state.interviewer}
          onChange={onChange}
        />  
      </section>
    </main>
    
  );
}
