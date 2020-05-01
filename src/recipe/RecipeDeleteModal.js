import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios"

export default function RecipeDeleteModal({
  open,
  recipeId,
  handleClose,
  handleListRefresh,
}) {
  function handleDelete(e) {
    e.preventDefault();
    axios
      .delete("http://192.168.0.242:8080/api/recipes/" + recipeId)
      .then(handleClose)
      .then(handleListRefresh)
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
  );
}