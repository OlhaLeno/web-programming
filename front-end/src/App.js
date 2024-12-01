// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage'; 
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import { BookProvider } from './context/BookContext';

function App() {
  return (
    <BookProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="catalog" element={<CatalogPage/>}/>
          <Route path="/book/:id" element={<ItemPage />} /> 
          <Route path="/cart" element={<CartPage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/success' element={<SuccessPage/>}/>
        </Routes>
      </Router>
    </BookProvider>
  );
};

export default App;