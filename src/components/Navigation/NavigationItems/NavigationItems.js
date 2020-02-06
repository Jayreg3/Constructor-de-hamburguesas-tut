import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Constructor de hamburguesas
      </NavigationItem>
      <NavigationItem link="/">Comprar</NavigationItem>
    </ul>
  );
};

export default navigationItems;
