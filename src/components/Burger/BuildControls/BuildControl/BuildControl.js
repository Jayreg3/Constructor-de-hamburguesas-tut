import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}
      >
        Menos
      </button>
      <button className={classes.More} onClick={props.added}>
        Mas
      </button>
    </div>
  );
};

export default buildControl;
