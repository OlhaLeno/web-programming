import React, { useContext, useState } from 'react';
import './Grid.css';
import { BookContext} from '../../context/BookContext';
import BookCard from './BookCard/BookCard';

function Grid() {
  const { books } = useContext(BookContext);
  const [showAll, setShowAll] = useState(false);

  const visibleBooks = showAll ? books : books.slice(0, 4);

  const handleToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

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
