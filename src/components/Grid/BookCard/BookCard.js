import React from 'react';
import './BookCard.css';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';

import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const navigate = useNavigate();

  const { id, title, image, genre, pages, description, price } = book;

  const handleNavigate = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="book-card">
      <img src={require(`../../../assents/images/${image}`)} alt={title} className="book-image" />
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
