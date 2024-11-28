import React, { useEffect, useState } from "react";
import './Info.css';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCartToServer, getBookById } from '../../api/axiosConfig'; 

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 

    const [book, setBook] = useState(null);
    const [numbers, setNumbers] = useState(1);
    const [cover, setCover] = useState("Тверда");
    const [error, setError] = useState(null);

    // Завантаження даних книги
    useEffect(() => {
        const loadBookData = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (error) {
                setError("Помилка завантаження книжки");
                console.error("Помилка завантаження книжки:", error);
            }
        };
        loadBookData();
    }, [id]);

    if (!book) {
        return <div>{error ? error : "Завантаження..."}</div>;
    }

    // Обчислення множника ціни в залежності від типу обкладинки
    const getPriceMultiplier = (coverType) => {
        switch (coverType) {
            case "Тверда":
                return 1;
            case "М'яка":
                return 0.9;
            case "Суперобкладинка":
                return 1.1;
            default:
                return 1;
        }
    };

    const priceMultiplier = getPriceMultiplier(cover);
    const totalPrice = book.price * numbers * priceMultiplier;

    // Додавання товару до LocalStorage
    const handleAddToCart = () => {
        const bookWithDetails = { ...book, numbers, cover, totalPrice };
        
        // Отримуємо поточний кошик з LocalStorage
        let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Додаємо новий товар або оновлюємо існуючий
        const existingIndex = currentCart.findIndex(item => item.id === bookWithDetails.id);
        if (existingIndex > -1) {
            currentCart[existingIndex].numbers += bookWithDetails.numbers;
        } else {
            currentCart.push(bookWithDetails);
        }

        // Оновлюємо кошик в LocalStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));

        alert('Товар додано до кошика');
    };

    const goBackToCatalog = () => {
        navigate('/catalog');
    };

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
                <h2>{book.title}</h2>
                <p><strong>Опис:</strong> {book.description}</p>
                <p><strong>Кількість сторінок: </strong> {book.pages}</p>
                <p><strong>Жанр книжки: </strong> {book.genre}</p>

                <label>
                    <span>Кількість книжок:</span>
                    <select
                        className="ItemFilter"
                        value={numbers}
                        onChange={(e) => setNumbers(Number(e.target.value))}
                    >
                        {Array.from({ length: Math.max(book.maxNumbers || 1, 10) }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>Обкладинка:</span>
                    <select
                        className="ItemsFilter"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)}
                    >
                        <option value="Тверда">Тверда</option>
                        <option value="М'яка">М'яка</option>
                        <option value="Суперобкладинка">Суперобкладинка</option>
                    </select>
                </label>
            </div>
            
            <p className="price">Загальна вартість: {totalPrice} грн</p>
            <div className="buttons">
                <button className="go-back-button" onClick={() => navigate(-1)}>Повернутись</button>
                <button 
                    className="add-to-cart-button" 
                    onClick={handleAddToCart}
                    disabled={!numbers || !cover}
                >
                    Додати до кошика
                </button>
            </div>
        </div>
    );
};

export default ItemPage;
