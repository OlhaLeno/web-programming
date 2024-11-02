// src/App.js
import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Grid from "./components/Grid/Grid";
import Button from "./components/Button/Button";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Grid />
      <Button />
      <Footer />
    </div>
  );
};

export default App;
