export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const days = state.days;
  const appointments = state.appointments;
  let apptIDs = [];
  const output = [];
  const selectedDay = days.filter( item => item["name"] === day );

  if (selectedDay.length > 0) {
    apptIDs = selectedDay[0]["appointments"];
  }

  for (let item in appointments) {
    if (apptIDs.includes(Number(item))) {
      output.push(appointments[item]);
    }
  }
  return output;
}

export function getInterview(state, interview) {
  // Start with the interview object
  const output = interview;

  // Take the id and rewrtie to be an object with interviewer data
  if ( !interview ) {
    return null;
  }
  const interviewerID = output.interviewer;

  for (let item of Object.keys(state.interviewers)) {
    if (state.interviewers[item]["id"] === interviewerID) {
      output.interviewer = state.interviewers[item];
      return output;
    }
  }
}
