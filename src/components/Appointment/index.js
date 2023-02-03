import React from "react";
import './styles.scss';
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import { useVisualMode } from '../../hooks/useVisualMode';

// Constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={[]}
            onSave={() => transition(SHOW)}
            onCancel={ () => back(EMPTY)}
          />
        )}
    </article>
  )
}
