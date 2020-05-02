import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "./Navbar.js";
import RecipeList from "./recipe/RecipeList.js";
import "./App.scss";

function App() {
  return (
    <div>
      
      <Container fluid>
        <div className="App">
          <Navbar/>
          <RecipeList/>
        </div>
      </Container>
    </div>
  );
}

export default App;
