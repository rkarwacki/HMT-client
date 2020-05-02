import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Fraction from "fraction.js";

export default function RecipeReadModal({ recipeId, open, handleClose }) {
  const [hasError, setError] = useState(false);
  const [recipe, setRecipe] = useState({ category: {} });
  const [portions, setPortions] = useState(1);
  let [baseIngredients, setBaseIngredients] = useState(null);
  const [calculatedIngredients, setCalculatedIngredients] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);

  function handlePortionIncrease() {
    setPortions(portions + 1);
  }

  function handlePortionDecrease() {
    if (portions > 1) {
      setPortions(portions - 1);
    }
  }

  useEffect(() => {
    if (baseIngredients) {
      recalculateIngredientAmountsBasedOnPortions();
    }
  }, [portions]);

  function recalculateIngredientAmountsBasedOnPortions() {
    let recalculatedIngredients = baseIngredients.map((ingredient) => {
      let recalculatedIngredient = { ...ingredient };
      recalculatedIngredient.measurementAmount = new Fraction(
        ingredient.measurementAmount
      )
        .mul(portions)
        .toFraction(true)
        .toString()
        .replace(" ", " i ");
      recalculatedIngredient.amount = new Fraction(ingredient.amount)
        .mul(portions)
        .toFraction(true)
        .toString()
        .replace(" ", " i ");
      return recalculatedIngredient;
    });
    setCalculatedIngredients(recalculatedIngredients);
  }

  useEffect(() => {
    async function fetchRecipe() {
      if (open && recipeId) {
        try {
          await axios
            .get("http://192.168.0.242:8080/api/recipes/" + recipeId)
            .then(function (response) {
              setRecipe(response.data);
              setPortions(response.data.portions);
              setBaseIngredients(
                prepareBaseIngredients(response.data.ingredients)
              );
              setLoadingRecipe(false);
            })
            .catch(function (error) {
              setError(error);
              setLoadingRecipe(false);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }

    setLoadingRecipe(true);
    fetchRecipe();
    return () => {
      setRecipe({ category: {} });
      setLoadingRecipe(true);
      setCalculatedIngredients(null);
      setBaseIngredients(null);
    };
  }, [open, recipeId]);

  function prepareBaseIngredients(ingredients) {
    baseIngredients = ingredients.map((ingredient) => {
      return breakIngredientDown(ingredient);
    });
    setCalculatedIngredients(baseIngredients);
    return baseIngredients;
  }

  function breakIngredientDown(ingredient) {
    let newIngredient = {};
    newIngredient.id = ingredient.id;
    newIngredient.ingredientName = ingredient.ingredientName;
    newIngredient.amount = ingredient.amount;
    newIngredient.amountUnit = ingredient.amountUnit;
    let [measurementAmount, measurementUnit] = getMeasurementDetailsFromHint(
      ingredient.amountHint
    );

    newIngredient.measurementAmount = measurementAmount;
    newIngredient.measurementUnit = measurementUnit;
    return newIngredient;
  }

  function getMeasurementDetailsFromHint(amountHint) {
    amountHint = amountHint.trim();
    let amountAndUnitSeparationIndex = amountHint.lastIndexOf(" ");
    let measurementUnit = amountHint
      .substring(amountAndUnitSeparationIndex)
      .trim();
    let measurementAmountString = amountHint
      .substring(0, amountAndUnitSeparationIndex)
      .trim();
    if (measurementAmountString.includes(" i ")) {
      measurementAmountString = measurementAmountString.replace(" i ", " ");
    }
    let measurementAmount = new Fraction(measurementAmountString).toFraction(
      true
    );

    return [measurementAmount, measurementUnit];
  }

  let modalBody = "";
  if (loadingRecipe) {
    modalBody = <Modal.Body>Ładowanie...</Modal.Body>;
  } else if (hasError) {
    modalBody = <Modal.Body>Błąd</Modal.Body>;
  } else {
    modalBody = (
      <Modal.Body>
        <Container>
          <Row className="readRecipeInfo">
            <Col sm>{recipe.category.name}</Col>
            <Col sm>{recipe.kcal} kcal na porcję</Col>
          </Row>
          <Row className="readRecipeInfo">
            <Col sm>Porcje: {portions} </Col>
            <Col sm>
              <Button
                className="smallTableButton"
                variant="primary"
                onClick={handlePortionDecrease}
              >
                <i className="fas fa-minus"></i>
              </Button>
              <Button
                className="smallTableButton"
                variant="primary"
                onClick={handlePortionIncrease}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </Col>
          </Row>
          <Row className="readRecipeInfo">
            <Col sm>Składniki</Col>
          </Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Składnik</th>
                <th>Ilość</th>
                <th>Miara</th>
              </tr>
            </thead>
            <tbody>
              {calculatedIngredients.map((ingredient, index) => {
                return (
                  <tr key={ingredient.ingredientName}>
                    <td>{index + 1}</td>
                    <td>{ingredient.ingredientName}</td>
                    <td>
                      {ingredient.measurementAmount}{" "}
                      {ingredient.measurementUnit}
                    </td>
                    <td>
                      {ingredient.amount}
                      {ingredient.amountUnit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Row className="readRecipeInfo">
            <Col sm>Kroki</Col>
          </Row>
          <Container>
            {recipe.steps.map((step, index) => {
              return (
                <div key={step.stepDescription}>
                  {index + 1}. {step.stepDescription}
                </div>
              );
            })}
          </Container>
        </Container>
      </Modal.Body>
    );
  }

  return (
    <Modal show={open} onHide={handleClose} dialogClassName="modal-50w">
      <Modal.Header closeButton>
        <Modal.Title>{recipe.name}</Modal.Title>
      </Modal.Header>
      {modalBody}
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
