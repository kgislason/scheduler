import React, {useEffect} from "react";
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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview);
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
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            interviewers={props.interviewers}
            onCancel={ () => back(EMPTY)}
            save={save}
          />
        )}
        {mode === SAVING && (
          <Status />
        )}
    </article>
  )
}
