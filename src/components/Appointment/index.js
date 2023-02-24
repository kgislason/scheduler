import React, { useState } from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


// Constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  // We set the error message if there is an error to pass to the <Error />
  const [error, setError] = useState("");

  // Manage how the user moves through the application
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Handle Saving of the Form
  const save = (name, interviewer) => {
    setError("");
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    // onComplete...
    props.bookInterview(props.id, interview)
      .then( (res) => {
        if (res[0]) {
          transition(SHOW);
        } else {
          setError(String(String(res[1])));
          transition(ERROR_SAVE, true);
        }
      });
  }

  // Handle Deleting of an appointment (after confirmation)
  const handleConfirmDelete = (id) => {
    transition(DELETING, true);
    setError("");

    props.cancelInterview(id)
    .then( (res) => {
      if (res[0]) {
        transition(EMPTY);
      } else {
        setError(String(String(res[1])));
        transition(ERROR_DELETE, true);
      }
    });

    // TO DO
    // Handle ERRORS
  }

  return (
    <article className="appointment" data-testid="appointment">
        <Header 
          time={props.time}
        />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form
            id={props.id}
            interviewers={props.interviewers}
            onCancel={ () => back()}
            onSave={save}
          />
        )}
        {mode === EDIT && (
          <Form
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={ () => back()}
            onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status
            message="Saving"
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={error}
            onClose={() => back(EMPTY)}
          />
        )}
        {mode === DELETING && (
          <Status
            message="Deleting..."
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={error}
            onClose={() => transition(SHOW)}
          />
        )}
        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete?"
            onConfirm={() => handleConfirmDelete(props.id)}
            onCancel={() => back()}
          />
        )}
    </article>
  )
}
