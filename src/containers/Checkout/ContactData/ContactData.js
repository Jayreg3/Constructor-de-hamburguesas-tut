import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      nombre: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tú nombre"
        },
        value: ""
      },
      calle: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Calle"
        },
        value: ""
      },
      ciudad: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ciudad"
        },
        value: ""
      },
      código_postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Código Postal"
        },
        value: ""
      },
      país: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "País"
        },
        value: ""
      },
      correo: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Tú Correo"
        },
        value: ""
      },
      método_de_entrega: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "más_rapido", displayValue: "Más Rapido" },
            { value: "más_barato", displayValue: "Más Barato" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredientes: this.props.ingredients,
      //en realidad, debes re-calcular el precio por si acaso un usuario ha manipulado el precio manualmente
      precio: this.props.price
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" clicked={this.orderHandler}>
          Pide
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Anade tus datos de contacto</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
