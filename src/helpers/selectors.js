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

  // for (let item in appointments) {
  //   if (apptIDs.includes(Number(item))) {
  //     output.push(appointments[item]);
  //   }
  // }
  console.log("Appt: ", day, output);
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

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const days = state.days;
  const interviewers = state.interviewers;
  let intIDs = [];
  const output = [];
  const selectedDay = days.filter( item => item["name"] === day );

  if (selectedDay.length > 0) {
    intIDs = selectedDay[0]["interviewers"];
  }

  for (const key of intIDs) {
    output.push(state.interviewers[key]);
  }

  // for (let ind in interviewers) {
  //   if (intIDs.includes(Number(interviewers[ind]["id"]))) {
  //     output.push(interviewers[ind]);
  //   }
  // }
  return output;
}
