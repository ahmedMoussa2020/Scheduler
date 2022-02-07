import React from "react";
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



  export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview} = useApplicationData()
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState(prev => ({ ...prev, day }));
  
  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers")
  //   ]).then((all) => {
  //     setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //   });
  // },[]);

  // function bookInterview(id, interview) {
  //   console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
    
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    
  //   return axios.put(`/api/appointments/${id}`,{interview})
  //   .then(() => {
  //     setState(prev => ({ ...prev, appointments }));
  //   });

  // }

  // function cancelInterview(id){
  //   console.log(id);

  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

    
  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(() => {
  //       setState(prev => ({ ...prev, appointments }));
  //     });
  // }

    const appointmentsOnCurrentDay = getAppointmentsForDay(state, state.day);
    const interviewersOnCurrentDay = getInterviewersForDay(state, state.day);

    const schedule = appointmentsOnCurrentDay.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewersOnCurrentDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
      {schedule}
      <Appointment time="5pm" />
        </section>
    </main>
  );
}
