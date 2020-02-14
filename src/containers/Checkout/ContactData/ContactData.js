import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
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
      precio: this.props.price,
      cliente: {
        nombre: "Jerry R",
        dirección: {
          calle: "Calle Avenida",
          ciudad: "Seville, Espana",
          código_postal: "400234"
        },
        correo: "prueba@email.com"
      },
      método_de_entrega: "en coche"
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

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Tú Nombre"
        />
        <Input
          inputtype="input"
          type="text"
          name="email"
          placeholder="Tú Correo"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Calle"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Código Postal"
        />
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
