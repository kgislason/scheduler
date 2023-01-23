import React from "react";

export default function DayListItem(props) {
  let full = props.spots === 0;
  let name = props.name;
  const selected = props.name === props.day;
  const setDay = props.setDay;

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}