import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Constructor de hamburguesas
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/pedidos">Pedidos</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/auth">Autenticar</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Cerrar sesión</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
