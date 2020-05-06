import React from "react";
import { Button, Form, Col } from "react-bootstrap";

export default function RecipeIngredients({ ingredients, updateIngredientCallback }) {
  let ingredientsHeader = ingredients.size ? (<Form.Row>
    <Form.Label as={Col} md="1">
      #
    </Form.Label>
    <Form.Group as={Col} md="4" controlId="name">
    <Form.Label>
        Nazwa produktu
      </Form.Label>
    </Form.Group>
    <Form.Group as={Col} md="3" controlId="hint">
    <Form.Label>
        Opis ilości
      </Form.Label>
    </Form.Group>
    <Form.Group as={Col} md="2" controlId="amount">
    <Form.Label>
        Ilość
      </Form.Label>
    </Form.Group>
    <Form.Group as={Col} md="1" controlId="unit">
      <Form.Label>
        Jednostka
      </Form.Label>
    </Form.Group>
  </Form.Row>) : '';
  let addIngredientButton = (
    <Button
      variant="success"
      // type="submit"
      form="recipeForm"
      // onClick={(e) => handleUpdate(e)}
    >
      Dodaj składnik
    </Button>);

  return (
    <Form.Group className={"condensedGroup"}>
      {ingredientsHeader}
      {ingredients.map((ingredient, index) => (
        <div key={ingredient.id}>
          <Form.Row>
            <Form.Label column="sm" lg={1}>
              {index + 1}.
            </Form.Label>
            <Form.Group as={Col} md="4" controlId="hint">
              <Form.Control
                type="text"
                name="ingredientName"
                onChange={e => updateIngredientCallback(ingredient.id, e)}
                defaultValue={ingredient.ingredientName}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="hint">
              <Form.Control
                type="text"
                name="amountHint"
                onChange={e => updateIngredientCallback(ingredient.id, e)}
                defaultValue={ingredient.amountHint}
              />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="amount">
              <Form.Control
                type="text"
                name="amount"
                onChange={e => updateIngredientCallback(ingredient.id, e)}
                defaultValue={ingredient.amount}
              />
            </Form.Group>
            <Form.Group as={Col} md="1" controlId="unit">
              <Form.Control
                type="text"
                name="amountUnit"
                onChange={e => updateIngredientCallback(ingredient.id, e)}
                defaultValue={ingredient.amountUnit}
              />
            </Form.Group>
            <Form.Group as={Col} md="1" controlId="deleteIngredient">
              <Button className="smallTableButton" variant="danger">
                <i className="fas fa-trash-alt"></i>
              </Button>
            </Form.Group>
          </Form.Row>
          <br />
        </div>
      ))}
      {addIngredientButton}
    </Form.Group>
  );
}
