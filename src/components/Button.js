import React from "react";

import "components/Button.scss";

export default function Button(props) {
   let buttonClass = "button";
   let buttonDisabled = "";
   let buttonOnClick = (event) => {
      console.log('Button clicked');
   };

  if (props.confirm) {
    buttonClass += " button--confirm";
  }
  
  if (props.danger) {
    buttonClass += " button--danger";
  }

  return <button disabled={props.disabled} onClick={props.onClick} className={buttonClass}>{props.children}</button>;
}
