import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewersData = Object.keys(props.interviewers).map(ind => {
    let id = props.interviewers[ind].id;
    return (   
      <InterviewerListItem
        key={props.interviewers[ind].id}
        name={props.interviewers[ind].name}
        avatar={props.interviewers[ind].avatar}
        selected={id === props.value}
        setInterviewer={() => props.onChange(props.interviewers[ind].id) }
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersData}
      </ul>
    </section>
  );
}