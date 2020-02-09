import React from "react";
import classes from "./Spinner.module.css";

const spinner = () => {
  return <div className={classes.Loader}>Cargando...</div>;
};

export default spinner;
