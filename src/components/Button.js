import React from "react";

import "components/Button.scss";
import classNames from 'classnames';

export default function Button(props) {
   const { confirm, danger } = props;
   const buttonClass = classNames(
      "button",
      { "button--confirm": confirm },
      { "button--danger": danger }
   );

   return (
      <button
         className={buttonClass}
         disabled={props.disabled}
         onClick={props.onClick}
      >
         {props.children}
      </button>
   );
}