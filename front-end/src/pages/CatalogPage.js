import React, { useState } from 'react';
import Header from '../components/Header/Header';
import BooksList from '../components/BooksList/BooksList';
import Footer from '../components/Footer/Footer';
import './CatalogPage.css';


function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Header showSearch={true} onSearchChange={handleSearchChange} />
      <BooksList searchTerm={searchTerm}/>
      <Footer/>
    </div>
  );
}

export default CatalogPage;
