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

    // Update spots remaining inside state.days
    const days = state.days;
    let day = state.day;
    let key;

    for (let item in days) {
      if (day === state.days[item]["name"]) {
        key = item
      };
    }

    let spots = days[key].spots - 1;
    days[key].spots = spots;

    return axios.put(`/api/appointments/${id}`, appointment)
      .then( (res) => {
        setState({
          ...state,
          appointments,
          days
        });

        return [true, res];
      })
      .catch((err) => {
        console.log("This: ", err);
        return [false, err];
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

    // Update spots remaining inside state.days
    const days = state.days;
    let day = state.day;
    let key;

    for (let item in days) {
      if (day === state.days[item]["name"]) {
        key = item
      };
    }

    let spots = days[key].spots + 1;
    days[key].spots = spots;

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log("Response: ", res);
        setState({
          ...state,
          appointments,
          days
        });
        if (res !== undefined) {
          return [true, res];
        } else {
          return [true, "Response ok."]
        }
      })
      .catch((err) => {
        if (err !== undefined) {
          let error = err;
          return [false, err];
        } else {
          return [false, "Unable to save appointment."];
        }
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
      return err;
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}