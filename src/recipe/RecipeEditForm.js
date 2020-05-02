import React from "react";
import Form from "react-bootstrap/Form";

export default function RecipeEditForm({ recipe, categories }) {
  return (
    <Form>
      <Form.Group controlId="title">
        <Form.Label>Recipe title</Form.Label>
        <Form.Control
          required
          size="lg"
          type="text"
          placeholder="Recipe title"
          defaultValue={recipe.name}
        />
      </Form.Group>
      <Form.Group controlId="kcal">
        <Form.Label>Kcal na porcję</Form.Label>
        <Form.Control
          required
          size="text"
          type="text"
          placeholder="kcal"
          defaultValue={recipe.kcal}
        />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select">
          {categories.map((category) => (
            <option id={category.id}>{category.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
}
