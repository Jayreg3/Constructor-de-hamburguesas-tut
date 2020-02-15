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
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      calle: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Calle"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      ciudad: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ciudad"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      código_postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Código Postal"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      país: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "País"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      correo: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Tú Correo"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      método_de_entrega: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "más_rapido", displayValue: "Más Rapido" },
            { value: "más_barato", displayValue: "Más Barato" }
          ]
        },
        value: "más_rapido",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    this.setState({ loading: true });
    const order = {
      ingredientes: this.props.ingredients,
      //en realidad, debes re-calcular el precio por si acaso un usuario ha manipulado el precio manualmente
      precio: this.props.price,
      orderData: formData
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

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
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
