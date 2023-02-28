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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  const [error, setError] = useState("");

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /**
   * save()
   * 
   * Description: Handle Saving of the Form:
   * transition to SAVING
   * Calls the bookInterview function
   * Error handling
   * 
   * @param {*} name 
   * @param {*} interviewer 
   */
  const save = (name, interviewer) => {
    setError("");
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW);
      })
      .catch(() => {
        setError("Error: Unable to save interview.");
        transition(ERROR_SAVE, true);
      });
  };

  /**
   * handleConfirmDelete()
   * 
   * Description: Handles deleting of an appointment after confirmation
   * transitions to Deleting, error handling
   * 
   * @param {*} id 
   */
  const handleConfirmDelete = id => {
    setError("");
    transition(DELETING);

    props.cancelInterview(id)
      .then(res => {
        transition(EMPTY);      
      })
      .catch(() => {
        setError("Error: Unable to cancel interview.");
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
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
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && (
        <Error message={error} onClose={back} />
      )}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_DELETE && (
        <Error message={error} onClose={() => transition(SHOW)} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => handleConfirmDelete(props.id)}
          onCancel={back}
        />
      )}
    </article>
  );
}
