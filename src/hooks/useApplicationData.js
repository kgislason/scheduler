import { useState, useEffect } from "react";
import { getInterviewersForDay } from "helpers/selectors";
import axios from "axios";

export function useApplicationData(initial) {

  // UseState
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
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

  /**
   * bookInterview
   *
   * @param {*} id 
   * @param {*} interview 
   * @returns a promise from axios put request to add new interview appointment
   */

  const bookInterview = async(id, interview, callback) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment, () => {
      setState({
        ...state,
        appointments
      });
    })
      .then((response) => {
        // Send this reponse to the Appointmetn save() function
        // to manage transition
        callback(response);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        callback(err);
      });
  }

  /**
   * Cancel Interview (Delete)
   * 
   * Description: uses the appointment id to find the right appointment slot 
   * and set it's interview data to null.
   * 
   * @param {*} id 
   * @returns a promise - delete appointment
   */

  const cancelInterview = (id, callback) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, () => {
      setState({
        ...state,
        appointments
      });
    })
      .then((response) => {
        callback(response);
      })
      .catch((err) => {
        callback(err);
      });
  }

  useEffect( () => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then( (all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data,interviewers: all[2].data}));
    })
    .catch((err) => {
      console.log("Error", err);
    });
  }, [state.day]);
  // Leave [state.days] to ensure everytime we go back to a day, the data still loads. If [] is used, then after returning to a day, data is empty

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}