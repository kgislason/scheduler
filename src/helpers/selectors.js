/**
 * getAppointmentsForDay()
 * 
 * @param {*} state 
 * @param {*} day 
 * @returns an array of appointments for that day
 */
export function getAppointmentsForDay(state, day) {
  const days = state.days;
  let apptIDs = [];
  const output = [];
  const selectedDay = days.filter( item => item["name"] === day );

  if (selectedDay.length > 0) {
    apptIDs = selectedDay[0]["appointments"];
  }

  for (const key of apptIDs) {
    output.push(state.appointments[key]);
  }

  return output;
}

/**
 * 
 * getInterview()
 * 
 * @param {} state Object
 * @param {*} interview Object
 * @returns 
 */

export function getInterview(state, interview) {
  const output = interview;

  if ( !interview ) {
    return null;
  }
  const interviewerID = output.interviewer;

  for (let item of Object.keys(state.interviewers)) {
    if (state.interviewers[item]["id"] === interviewerID) {
      output.interviewer = state.interviewers[item];
    }
  }
  return output;
}

/**
 * getInterviewersForDay()
 * 
 * @param {*} state Object 
 * @param {*} day String
 * @returns an array of appointment for the selected day
 */

export function getInterviewersForDay(state, day) {
  let intIDs = [];
  const output = [];

  const selectedDay = state.days.filter( item => item["name"] === day );

  if (selectedDay.length > 0) {
    intIDs = selectedDay[0]["interviewers"];
  }

  for (const key of intIDs) {
    output.push(state.interviewers[key]);
  }

  return output;
}
