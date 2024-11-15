import React, { useState, useEffect } from 'react';
import './Grid.css';
import BookCard from './BookCard/BookCard';
import Loader from '../Loader/Loader';
import { getProducts } from '../../api/axiosConfig';

function Grid() {
  const [books, setBooks] = useState([]); 
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await getProducts(); 
        setBooks(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); 

  const visibleBooks = showAll ? books : books.slice(0, 4);

  const handleToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid">
      {visibleBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <button className="view-mores" onClick={handleToggle}>
        {showAll ? 'Приховати' : 'Переглянути всі'}
      </button>
    </div>
  );
}

export default Grid;
