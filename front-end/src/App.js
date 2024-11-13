// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage'; 
import {BookProvider } from './context/BookContext';

const App = () => {
  return (
    <BookProvider>
      <Router>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="catalog" element={<CatalogPage/>}/>
          <Route path="/book/:id" element={<ItemPage />} /> 
      </Routes>
    </Router>

    </BookProvider>
    
  );
};

export default App;