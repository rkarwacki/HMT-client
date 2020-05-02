import React from "react";
import { Button, Form, Col } from "react-bootstrap";

export default function RecipeIngredients({ ingredients }) {
  return (
    <Form.Group className={"condensedGroup"}>
      <Form.Label column="lg" lg={1}>
        Składniki
      </Form.Label>
      <Form.Row>
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
      </Form.Row>
      {ingredients.map((ingredient, index) => (
        <div key={ingredient.ingredientName}>
          <Form.Row>
            <Form.Label column="sm" lg={1}>
              {index + 1}.
            </Form.Label>
            <Form.Group as={Col} md="4" controlId="hint">
              <Form.Control
                type="text"
                defaultValue={ingredient.ingredientName}
                placeholder="Mleko"
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="hint">
              <Form.Control
                type="text"
                defaultValue={ingredient.amountHint}
                placeholder="1/2 szklanki"
              />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="amount">
              <Form.Control
                type="text"
                defaultValue={ingredient.amount}
                placeholder="200"
              />
            </Form.Group>
            <Form.Group as={Col} md="1" controlId="unit">
              <Form.Control
                type="text"
                defaultValue={ingredient.amountUnit}
                placeholder="ml"
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
    </Form.Group>
  );
}
