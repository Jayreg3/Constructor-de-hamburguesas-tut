import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //Puede ser un componente funcional, no tiene que ser un componente clase
  componentDidUpdate() {
    console.log("[OrderSummary] DidUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}: </span>
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Tu pedido</h3>
        <p>Un burger con los siguentes...</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Precio total: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Lista para pedir?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCELA
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          SIGUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
