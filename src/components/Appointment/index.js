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

    if (!name ) {
      setError("You must enter a student name");
      transition(ERROR_SAVE);
    } else if (!interviewer) {
      setError("You must select an interviewer.");
      transition(ERROR_SAVE);
    } else {
      transition(SAVING, true);

      // onComplete...
      props.bookInterview(props.id, interview, (res) => {
        console.log("Response: ", res);
        if (res.status > 200 && res.status < 300) {
          // Transition to show the new appointment
          transition(SHOW);
        } else {
          let message = String(res);
          setError(`${message}`);
          // Show an error if sainv is not successful
          transition(ERROR_SAVE, true);
        }
      });  
    }
  }

  // Handle Deleting of an appointment (after confirmation)
  const handleConfirmDelete = (id) => {
    transition(DELETING, true);
    setError("");

    props.cancelInterview(id, (res) => {      
      console.log("Response: ", res);
      // Transition to empty spot if delete is successful
      if (res.status > 200 && res.status < 300) {
        transition(EMPTY);
      } else {
        // Otherwise show an error
        let message = String(res);
        setError(`${message}`);
        transition(ERROR_DELETE, true);  
      }
    });
  }

  return (
    <article className="appointment">
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
