import React from "react";
import Button from "react-bootstrap/Button";

export default function RecipeTableRow({ recipe, index, editRecipeCallback, deleteRecipeCallback }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{recipe.name}</td>
      <td>{recipe.category.name}</td>
      <td>
        <Button
          variant="primary"
          onClick={() => {
            editRecipeCallback(recipe.id);
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteRecipeCallback(recipe.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
