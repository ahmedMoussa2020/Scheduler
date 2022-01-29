import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const ERROR = 'ERROR';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';



export default function Appointment(props) {
  const { mode, back, transition } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    if (!name || !interviewer) return;
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    }).catch((err) => {
 
      transition(ERROR_SAVE, true);
    });
    
  }
  
  const handleDelete = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
 
        transition(ERROR_DELETE, true);
      });
  };

  console.log(props);
  return  (
  <article className="appointment">
  <Header time={props.time} /> 
  {mode === SHOW && <Show 
            student={props.interview.student} 
            interviewer={props.interview.interviewer} 
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}/> }
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
  {mode === SAVING && <Status message={'Saving'} />}
  {mode === DELETING && <Status message={'Deleting'} />}
  {mode === ERROR_SAVE && <Error message={"Something went wrong, could not save appoinment"} onClose={back} />}
  {mode === ERROR_DELETE && <Error message={"Something went wrong, appoinment is not deleted."} onClose={back} />}

  {mode === CREATE && <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />}
  {mode === EDIT && <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />}
  {mode === CONFIRM && <Confirm
            message={'Are you sure you want to delete this appointment?'}
            onCancel={back}
            onConfirm={handleDelete}
          />}
  {/* {props.interview ? <Show student=
  {props.interview.student} interviewer=
  {props.interview.interviewer} /> : <Empty />} */}
  </article>
  );
}