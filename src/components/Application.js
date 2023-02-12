import React from "react";
import "./Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { useApplicationData } from "../hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const allAppointments = dailyAppointments.map(appt => {
    return (
      <Appointment
        key={appt.id}
        id={appt.id}
        time={appt.time}
        interview={getInterview(state, appt.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

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
      </section>
    </main>

  );
}
