import React from "react";
import './Info.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookContext } from '../../context/BookContext';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const { books } = useBookContext(); 
    
    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
        return <div>Книжку не знайдено.</div>;
    }

    // Базовий URL для зображень на бекенді
    const BACKEND_URL = "http://localhost:5000/static/media";
    const imagePath = `${BACKEND_URL}/${book.image}`;

    return (
        <div className="book-details">
            <img 
                src={imagePath} 
                alt={book.title} 
                className="book-details-image"
            />
            <div className="book-info">
                <div className="characteristics">
                    <span className="characteristic">1 characteristic</span>
                    <span className="characteristic">2 characteristic</span>
                </div>
                <h2>{book.title}</h2>
                <p><strong>Опис:</strong> {book.description}</p>
                <p><strong>Кількість сторінок: </strong> {book.pages}</p>
                <p><strong>Жанр книжки: </strong> {book.genre}</p>

                <select className="ItemsFilter">
                    <option value="">Обкладинка</option>
                    <option value="Тверда">Тверда</option>
                    <option value="М'яка">М'яка</option>
                    <option value="суперобкладинка">Суперобкладинка</option>
                </select>
                <select className="ItemsFilter">
                    <option value="">Кількість: </option>
                    <option value="1">1</option>
                    <option value=''>2 і більше</option>
                </select>
            </div>
            
            <p className="price">Ціна: {book.price} грн</p>
            <div className="buttons">
                <button className="go-back-button" onClick={() => navigate(-1)}>Повернутись</button>
                <button className="add-to-cart-button">Додати до кошика</button>
            </div>
        </div>
    );
};

export default ItemPage;
