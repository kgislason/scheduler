import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daysData = props.days.map(singleDay => {
    return (      
      <DayListItem
        key={singleDay.id}
        name={singleDay.name}
        spots={singleDay.spots}
        selected={singleDay.name === props.value}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {daysData}
    </ul>
  );
}