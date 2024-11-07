import React from 'react';
import './BookCard.css';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../../../context/BookContext';

function BookCard({ id }) {
  const navigate = useNavigate();
  const { books } = useBookContext();

  
  const book = books.find(book => book.id === id);
  
  if (!book) {
    return <p>Книжку не знайдено</p>;
  }

  const { title, image, genre, pages, description, price } = book;
  
  const handleNavigate = () => {
    navigate(`/book/${id}`);
  };

  
  const imagePath =require( `../../../assents/images/${image}`);

  return (
    <div className="book-card">
      <img src={imagePath} alt={title} className="book-image" />
      <h3>{title}</h3>
      <p><strong>Жанр: </strong>{genre}</p>
      <p><strong>Кількість сторінок: </strong>{pages}</p>
      <p><strong>Анотація: </strong>{description}</p>
      <p><strong>Ціна: </strong>{price} грн</p>

      <PrimaryButton label="Дізнатись більше" onClick={handleNavigate} />
    </div>
  );
}

export default BookCard;
