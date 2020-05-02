import React from "react";
import { Button, Form, Col } from "react-bootstrap";

export default function RecipeSteps({ steps }) {
  return (
    <Form.Group className={"condensedGroup"}>
      <Form.Label column="lg" lg={1}>
        Kroki
      </Form.Label>
      {steps.map((step) => (
        <div key={step.stepDescription}>
          <Form.Row>
            <Form.Label column="sm" lg={1}>
              {step.stepNumber}.
            </Form.Label>
            <Form.Group as={Col} md="9" controlId="hint">
              <Form.Control
                type="text"
                defaultValue={step.stepDescription}
                placeholder="Ugotuj ryż"
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
    </Form.Group>
  );
}
