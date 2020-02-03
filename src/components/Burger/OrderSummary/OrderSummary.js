import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}: </span>
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Tu pedido</h3>
      <p>Un burger con los siguentes...</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Precio total: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Lista para pedir?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCELA
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        SIGUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
