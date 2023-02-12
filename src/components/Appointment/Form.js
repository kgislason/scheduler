import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const onChange = (id) => { 
    console.log(id);
    setInterviewer(id);
  };

  const handleChange = (e) => {
    setStudent(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Student: ", student);
    console.log("Interviewer: ", interviewer);
    props.onSave(student, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={handleChange}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={onChange}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={handleSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}
