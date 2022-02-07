import {useState,useEffect} from "react";

import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [], 
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    const newState = { ...state, appointments }
    const updatedState = updateSpots(newState)
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => setState(updatedState))

  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = { ...state, appointments }
    const updatedState = updateSpots(newState)
    return axios.delete(`/api/appointments/${id}`)
      .then(res => setState(updatedState))
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev, days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, [])



  const updateSpots = (state) => {
    const currentDay = state.days.find(day => day.name === state.day)
    const apptIds = currentDay.appointments
    const accumulator = []
    for (const apptId of apptIds) {
      accumulator.push(state.appointments[apptId])
    }
    const nullAppointments = accumulator.filter(appointment => appointment.interview === null)
    const spots = nullAppointments.length
    currentDay.spots = spots
    return state
  }



  return {
    state, setDay, bookInterview, cancelInterview
  }
}