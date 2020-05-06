import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";

export default function RecipeSteps({ steps, updateStepCallback }) {
  let addStepButton = (
    <Button
      variant="success"
      // type="submit"
      form="recipeForm"
      // onClick={(e) => handleUpdate(e)}
    >
      Dodaj krok
    </Button>
  );

  if (steps) {
    return (
      <Form.Group className={"condensedGroup"}>
        {steps.map((step) => (
          <div key={step.id}>
            <Form.Row>
              <Form.Label column="sm" lg={1}>
                {step.stepNumber}.
              </Form.Label>
              <Form.Group as={Col} md="9" controlId="hint">
                <Form.Control
                  type="text"
                  defaultValue={step.stepDescription}
                  name="stepDescription"
                  onChange={e => updateStepCallback(step.id, e)}
                />
              </Form.Group>
              <Form.Group as={Col} md="2" controlId="stepActions">
                <Button className="smallTableButton" variant="primary">
                  <i className="fas fa-arrow-up"></i>
                </Button>
                <Button className="smallTableButton" variant="primary">
                  <i className="fas fa-arrow-down"></i>
                </Button>
                <Button className="smallTableButton" variant="danger">
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </Form.Group>
            </Form.Row>
            <br />
          </div>
        ))}
        <br />
        {addStepButton}
      </Form.Group>
    );
  } else {
    return (
      <Form.Group className={"condensedGroup"}>
        <br />
        {addStepButton}
      </Form.Group>
    );
  }
}
