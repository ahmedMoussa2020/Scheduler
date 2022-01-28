// The function will return an array of appointments for the given day.
export function getAppointmentsForDay(state, targetDay) {

  // Find the array of appointment IDs of the query day
  let appointmentIdArray = [];
  for (const day of state.days) {
    if (day.name === targetDay) {
      appointmentIdArray = day.appointments;
    }
  }

  // Add each appointment with that key
  const filteredAppointments = [];
  for (const appointmentId of appointmentIdArray) {
    filteredAppointments.push(state.appointments[appointmentId]);
  }

  return filteredAppointments;
}

// Return a new object containing the interview data when we pass it an object
// that contains the interviewer. Otherwise, the function should return null.
export function getInterview(state, interview) {
  try {
    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
  }
  catch{
    return null;
  };
}

// The function will return an array of interviewers for the given day.
export function getInterviewersForDay(state, dayString) {

  // Find the array of appointment IDs of the query day
  let interviewerIdArray = [];
  for (const day of state.days) {
    if (day.name === dayString) {
      interviewerIdArray = day.interviewers;
    }
  }

  // Add each appointment with that key
  const filteredInterviewers = [];
  for (const interviewerId of interviewerIdArray) {
    filteredInterviewers.push(state.interviewers[interviewerId]);
  }

  return filteredInterviewers;
}