import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
    saved: false
  });

  // Functions
  function setDay(day) {
    let dailyInterviewers = getInterviewersForDay(state, day);
    setState({ 
      ...state, 
      appointments: {...state.appointments},
      interviewers: dailyInterviewers,
      day
    });
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const allAppointments = dailyAppointments.map( appt => {
    const interview = getInterview(state, appt.interview);
    return(
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    )
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then((res) => {
      console.log(res);

      setState({
        ...state,
        appointments
      });
    })
    .catch( (err) => {
      console.log("Error: ", err);
    });
  }  

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
  }, [state.days]);

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
          interviewers={state.interviewers}
          value={state.interviewer}
        />
      </section>
    </main>
    
  );
}
