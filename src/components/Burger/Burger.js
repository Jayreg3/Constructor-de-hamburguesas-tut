import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  //Mira 'React Burger Nest' para mas informacion
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    });
  console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Por favor anade ingredientes</p>;
  }
  return (
    <div className={classes.Burger}>
      <p>[Burger.js]...rendered</p>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
