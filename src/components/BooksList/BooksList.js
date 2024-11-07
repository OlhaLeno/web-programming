import React, { useState } from 'react';
import booksData from '../../data/Books.json';
import BookCard from './BookCard/BookCard';
import Filters from '../Filters/Filters';
import './BooksList.css';

function BooksList({ searchTerm }) {
    const [filters, setFilters] = useState({ price: '', pages: '', genre: '' });

    const handleFilterChange = (selectedFilters) => {
        setFilters(selectedFilters);
    };

    const filteredBooks = booksData.filter((book) => {
      const priceMatch = filters.price ? book.price <= Number(filters.price) : true;
      const pagesMatch = filters.pages ? book.pages <= Number(filters.pages) : true;
      const genreMatch = filters.genre ? book.genre === filters.genre : true;
      
        const searchMatch = searchTerm 
            ? book.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) 
            : true;
  
      return priceMatch && pagesMatch && genreMatch && searchMatch;
  });
  

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />

            <div className="books-list">
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        name={book.title}
                        pages={book.pages}
                        genre={book.genre}
                        image={book.image}
                        price={book.price}
                        description={book.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default BooksList;
