import React from "react";
import './styles.scss';
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import { useVisualMode } from '../../hooks/useVisualMode';
import Status from "./Status";

// Constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  let student = props.interview ? props.interview.student : '';
  let interviewer = props.interview ? props.interview.interviewer.id : '';

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    //props.bookInterview(props.id, interview);

    setTimeout( () => {
      transition(SHOW);
    }, 3000);
  }

  return (
    <article className="appointment">
        <Header 
          time={props.time}
        />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(CREATE)}
          />
        )}
        {mode === CREATE && (
          <Form
            id={props.id}
            interviewers={props.interviewers}
            onCancel={ () => back(EMPTY)}
            save={save}
            student={student}
            interviewer={interviewer}
          />
        )}
        {mode === SAVING && (
          <Status />
        )}
    </article>
  )
}
