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

export default function Appointment(props) {
  const { mode, back, transition } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW)
  }
  
  const handleDelete = () => {
    transition(DELETING, true);
    props
      .cancelInterview()
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
 
        transition(ERROR, true);
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
  {mode === ERROR && <Error message={"Something went wrong"} onClose={back} />}

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