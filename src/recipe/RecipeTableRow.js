import React from "react";
import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RecipeTableRow({ recipe, index, openRecipeCallback, editRecipeCallback, deleteRecipeCallback }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{recipe.name}</td>
      <td>{recipe.category.name}</td>
      <td>
      <Button
          className="smallTableButton"
          variant="success"
          onClick={() => {
            openRecipeCallback(recipe.id);
          }}
        >
          <i className="fas fa-book-open"></i>
        </Button>
        <Button
          className="smallTableButton"
          variant="primary"
          onClick={() => {
            editRecipeCallback(recipe.id);
          }}
        >
          <i className="fas fa-edit"></i>
        </Button>
        <Button
          className="smallTableButton"
          variant="danger"
          onClick={() => {
            deleteRecipeCallback(recipe.id);
          }}
        ><i className="fas fa-trash-alt"></i>
        </Button>
      </td>
    </tr>
  );
}
