import { useState, useEffect } from "react";
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
    setState({ 
      ...state,
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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then( (res) => {
        console.log(res);
        setState({
          ...state,
          appointments
        });

        return res;
      })
      .catch((err) => {
        return err;
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

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments
        });
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
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
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}