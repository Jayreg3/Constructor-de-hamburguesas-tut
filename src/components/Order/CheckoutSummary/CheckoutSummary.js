import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>¡Esperamos que sepa bien!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCELA
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUA
      </Button>
    </div>
  );
};

export default checkoutSummary;
