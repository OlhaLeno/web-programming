import React from 'react';
import './BookCard.css';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router-dom';
const BookCard=({id, title, genre, pages, description, image, price }) => {
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:5000/static/media";
  const imagePath = `${BACKEND_URL}/${image}`;

  const handleNavigate = () => {
    navigate(`/book/${id}`);
  };

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
