import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import RecipeTableRow from "./RecipeTableRow";
import RecipeReadModal from "./RecipeReadModal";
import RecipeEditModal from "./RecipeEditModal";
import RecipeDeleteModal from "./RecipeDeleteModal";
import axios from "axios";

function RecipeList() {
  const headings = ["#", "Nazwa", "Typ", ""];

  const [hasError, setErrors] = useState(false);
  const [recipes, setRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(0);
  const [modalAction, setModalAction] = useState(0);
  const [recipeToReadId, setRecipeToReadId] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [recipeForDeletionId, setRecipeForDeletionId] = useState(null);
  const [showReadModal, setShowReadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    if (recipeToReadId) {
      handleShowReadModal();
    }
  }, [recipeToReadId]);
  const readRecipeCallback = (recipeId) => {
    setRecipeToReadId(recipeId);
  };
  const handleShowReadModal = () => {
    setShowReadModal(true);
  };
  const handleCloseReadModal = () => {
    setRecipeToReadId(null);
    setShowReadModal(false);
  };

  useEffect(() => {
    if (selectedRecipeId) {
      handleShowEditModal("EDIT");
    }
  }, [selectedRecipeId]);
  const editRecipeCallback = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };
  const handleShowEditModal = (action) => {
    setShowEditModal(true);
    setModalAction(action);
  };
  const handleCloseEditModal = () => {
    setSelectedRecipeId(null);
    setShowEditModal(false);
  };
    
  useEffect(() => {
    if (recipeForDeletionId) {
      handleShowDeleteModal();
    }
  }, [recipeForDeletionId]);
  const deleteRecipeCallback = (recipeId) => {
    setRecipeForDeletionId(recipeId);
  }
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setRecipeForDeletionId(null)
    setShowDeleteModal(false);
  }

  const handleRefresh = () => setUpdate(update + 1);
  
  useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get("http://192.168.0.242:8080/api/recipes")
          .then(function (response) {
            setRecipes(response.data);
            setLoading(false);
          })
          .catch(function (error) {
            setErrors(error);
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [update]);


  if (loading) {
    return <div>Loading...</div>;
  } else if (hasError) {
    return <div>Error while loading the data</div>;
  } else {
    return (
      <div>
        <Button
          variant="success"
          onClick={() => {
            handleShowEditModal("ADD");
          }}
        >
          Dodaj przepis
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headings.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <RecipeTableRow
                key={recipe.id}
                recipe={recipe}
                openRecipeCallback={readRecipeCallback}
                editRecipeCallback={editRecipeCallback}
                deleteRecipeCallback={() => {
                  deleteRecipeCallback(recipe.id);
                }}
                index={index}
              ></RecipeTableRow>
            ))}
          </tbody>
        </Table>
        <RecipeReadModal
          recipeId={recipeToReadId}
          open={showReadModal}
          handleClose={handleCloseReadModal}
        />
        <RecipeEditModal
          recipeId={selectedRecipeId}
          open={showEditModal}
          handleClose={handleCloseEditModal}
          handleListRefresh={handleRefresh}
          modalAction={modalAction}
        />
        <RecipeDeleteModal
          open={showDeleteModal}
          recipeId={recipeForDeletionId}
          handleClose={handleCloseDeleteModal}
          handleListRefresh={handleRefresh}
        />
      </div>
    );
  }
}

export default RecipeList;
