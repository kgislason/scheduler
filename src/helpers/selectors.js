/**
 * getAppointmentsForDay()
 * 
 * @param {*} state 
 * @param {*} day 
 * @returns 
 */
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
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

export function getInterview(state, interview) {
  // Start with the interview object
  const output = interview;

  // Take the id and rewrite to be an object with interviewer data
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

  // Filter the state object by surrent day
  const selectedDay = state.days.filter( item => item["name"] === day );

  // Extract the Interviewer IDS
  if (selectedDay.length > 0) {
    intIDs = selectedDay[0]["interviewers"];
  }

  // Build them into interviewer objects for the day
  for (const key of intIDs) {
    output.push(state.interviewers[key]);
  }

  return output;
}
