import { useState, useEffect } from "react";
import axios from "axios";

/**
 * useApplicationData
 *
 * Description: Manages state for our app inside an object
 * Includes state for: day, days, appointments, interviewers
 *
 * functions: setDay(), bookInterview(), cancelInterview
 * @param {*} initial
 *
 */

export function useApplicationData (initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  /**
   * setDay()
   *
   * Change state of day inside status object
   * @param {*} day
   */
  function setDay (day) {
    setState({
      ...state,
      day,
    });
  }

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
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const interviewObj = Object.values(state.appointments).find(item => {
      return item.id === id;
    });

    const days = state.days;
    let day = state.day;
    let key;

    for (let item in days) {
      if (day === state.days[item]["name"]) {
        key = item;
      }
    }

    let spots = days[key].spots - 1;
    if (!interviewObj.interview) {
      days[key].spots = spots;
    }

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(res => {
        setState({
          ...state,
          appointments,
          days,
        });

        return [true, res];
      })
      .catch(err => {
          console.log("Error message: ", err);
          return [false, err];
      });
  };

  /**
   * Cancel Interview (Delete)
   *
   * Description: uses the appointment id to find the right appointment slot
   * and set it's interview data to null.
   *
   * @param {*} id
   * @returns a promise - delete appointment
   */

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days;
    let day = state.day;
    let key;

    for (let item in days) {
      if (day === state.days[item]["name"]) {
        key = item;
      }
    }
    let spots = days[key].spots + 1;
    days[key].spots = spots;

    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        setState({
          ...state,
          appointments,
          days,
        });
        
        return [true, res];
      })
      .catch(err => {
          return [false, err];
      });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch(err => {
        console.log("Error Message: ", err);
        return err;
      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
