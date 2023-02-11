import React from "react";
import './styles.scss';
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import { useVisualMode } from '../../hooks/useVisualMode';
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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then((res) => {
        console.log("Response: ", res);
      })
      .catch((err) => {
        console.log("Error: ", err);
        transition(ERROR_SAVE);
      })
      .finally(() => {
        transition(SHOW);
      });
  }

  const handleDelete = () => {
    transition(CONFIRM);
  }

  const handleConfirmDelete = (id) => {
    transition(DELETING);

    props.cancelInterview(id)
      .then((res) => {   
        console.log("Waiting");
      })
      .catch((err) => {
        console.log("Error: ", err);
        transition(ERROR_DELETE);        
      }).finally((data) => {
        console.log("Finally, ", data);
        transition(EMPTY);
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
            onDelete={handleDelete}
          />
        )}
        {mode === CREATE && (
          <Form
            id={props.id}
            interviewers={props.interviewers}
            onCancel={ () => back(EMPTY)}
            save={save}
          />
        )}
        {mode === EDIT && (
          <Form
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={ () => back(SHOW)}
            save={save}
          />
        )}
        {mode === SAVING && (
          <Status />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="Error saving"
            onClose={() => transition(EMPTY)}
          />
        )}
        {mode === DELETING && (
          <Status
            message="Deleting..."
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="Error deleting..."
            onClose={() => transition(SHOW)}
          />
        )}
        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete?"
            onConfirm={() => handleConfirmDelete(props.id)}
            onCancel={() => back(EMPTY)}
          />
        )}
    </article>
  )
}
