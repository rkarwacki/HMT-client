import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import RecipeIngredients from "./RecipeIngredients"
import RecipeSteps from "./RecipeSteps"
import axios from "axios";

export default function RecipeModal({
  recipeId,
  open,
  handleClose,
  handleListRefresh,
  modalAction,
}) {
  const [hasError, setError] = useState(false);
  const [recipe, setRecipe] = useState({ category: {} });
  const [categories, setCategories] = useState({});
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      if (recipeId && open && modalAction === "EDIT") {
        try {
          await axios
            .get("http://192.168.0.242:8080/api/recipes/" + recipeId)
            .then(function (response) {
              setRecipe(response.data);
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

    async function fetchCategories() {
      if (open) {
        try {
          await axios
            .get("http://192.168.0.242:8080/api/recipeCategories")
            .then(function (response) {
              setCategories(response.data);
              setLoadingCategories(false);
            })
            .catch(function (error) {
              setError(error);
              setLoadingCategories(false);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
    setLoadingRecipe(true);
    fetchRecipe();
    setLoadingCategories(true);
    fetchCategories();
    return () => {
      setLoadingRecipe(true);
      setLoadingCategories(true);
      setRecipe({ category: {} });
    };
  }, [open, recipeId, modalAction]);

  useEffect(() => {
    if (modalAction === "ADD" && categories[0]) {
      setRecipe({ ...recipe, category: { id: categories[0].id } });
    }
  }, [modalAction, categories]);
  //todo
  // }, [modalAction, categories, recipe]); causes infinite loop because recipe is changing in useEffect
  // move categories to separate object?

  function updateRecipeProperty(event) {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  }

  function updateRecipeCategory(event) {
    setRecipe({ ...recipe, category: { id: event.target.value } });
  }

  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put("http://192.168.0.242:8080/api/recipes", recipe)
      .then(handleClose)
      .then(handleListRefresh)
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleAdd(e) {
    e.preventDefault();
    axios
      .post("http://192.168.0.242:8080/api/recipes", recipe)
      .then(handleClose)
      .then(handleListRefresh)
      .catch(function (error) {
        console.log(error);
      });
  }

  let modalBody = "";
  let loading = loadingCategories;
  if (modalAction === "EDIT") {
    loading = loading || loadingRecipe;
  }
  if (loading) {
    modalBody = <Modal.Body>Ładowanie...</Modal.Body>;
  } else if (hasError) {
    modalBody = <Modal.Body>Błąd</Modal.Body>;
  } else {
    modalBody = (
      <Modal.Body>
        <Form id="recipeForm">
          <Form.Group controlId="title">
            <Form.Label>Nazwa przepisu</Form.Label>
            <Form.Control
              required
              size="lg"
              type="text"
              name="name"
              placeholder="Recipe title"
              defaultValue={recipe.name}
              onChange={updateRecipeProperty}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="category">
              <Form.Label>Kategoria</Form.Label>
              <Form.Control
                as="select"
                defaultValue={recipe.category.id}
                onChange={updateRecipeCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="kcal">
              <Form.Label>Kcal na porcję</Form.Label>
              <Form.Control
                required
                size="text"
                name="kcal"
                type="text"
                placeholder="kcal"
                defaultValue={recipe.kcal}
                onChange={updateRecipeProperty}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="portions">
              <Form.Label>Porcje</Form.Label>
              <Form.Control
                required
                size="text"
                name="portions"
                type="text"
                placeholder="portions"
                defaultValue={recipe.portions}
                onChange={updateRecipeProperty}
              />
            </Form.Group>
          </Form.Row>
          <RecipeIngredients ingredients={recipe.ingredients}/>          
          <RecipeSteps steps={recipe.steps}/>
        </Form>
      </Modal.Body>
    );
  }

  let submitButton = (
    <Button
      variant="primary"
      type="submit"
      form="recipeForm"
      onClick={(e) => handleUpdate(e)}
    >
      Zapisz zmiany
    </Button>
  );

  if (modalAction === "ADD") {
    submitButton = (
      <Button
        variant="primary"
        type="submit"
        form="recipeForm"
        onClick={(e) => handleAdd(e)}
      >
        Dodaj przepis
      </Button>
    );
  }
  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        dialogClassName="modal-75w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Przepis</Modal.Title>
        </Modal.Header>
        {modalBody}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
          {submitButton}
        </Modal.Footer>
      </Modal>
    </>
  );
}
