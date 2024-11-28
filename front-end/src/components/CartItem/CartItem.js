import React, { useState } from 'react';
import './CartItem.css';

const CartItem = ({ item, onCartUpdate }) => {
    const [numbers, setNumbers] = useState(item.numbers || 1);
    const [cover, setCover] = useState(item.cover || "Тверда");

    // Дефолтне зображення
    const defaultImage = '/stopka_books.png'; // Шлях до дефолтного зображення з папки public

    // Оновлення кількості товару
    const handleNumbersChange = (e) => {
        const updatedNumbers = Number(e.target.value);
        setNumbers(updatedNumbers);

        // Оновлюємо дані в LocalStorage
        updateCartInLocalStorage(item.id, updatedNumbers, cover);
        onCartUpdate();
    };

    // Оновлення типу обкладинки
    const handleCoverChange = (e) => {
        const updatedCover = e.target.value;
        setCover(updatedCover);

        // Оновлюємо дані в LocalStorage
        updateCartInLocalStorage(item.id, numbers, updatedCover);
        onCartUpdate();
    };

    // Оновлення кошика в LocalStorage
    const updateCartInLocalStorage = (id, updatedNumbers, updatedCover) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(cartItem => 
            cartItem.id === id 
                ? { ...cartItem, numbers: updatedNumbers, cover: updatedCover } 
                : cartItem
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Видалення товару з кошика
    const handleRemove = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(cartItem => cartItem.id !== item.id);  // виправлено видалення
        localStorage.setItem('cart', JSON.stringify(cart));
        onCartUpdate();
    };

    const totalPrice = item.price * numbers;

    // Шлях до зображення
    const imagePath = item.image ? `/images/${item.image}` : defaultImage; // Якщо є своє зображення, використовується воно

    return (
        <div className="cart-item">
            <div className="item-image">
                {/* Ось тут прописуємо шлях до зображення */}
                <img 
                    // src={imagePath} розкоментуй якщо хочеш
                    src = "/stopka_books.png"
                    alt={item.title} 
                    className="cart-item-image" 
                />
            </div>
            <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-price">Ціна: {totalPrice} грн</p>
            </div>
            <div className="item-controls">
                <label>Кількість:
                    <input 
                        type="number" 
                        value={numbers} 
                        min="1" 
                        onChange={handleNumbersChange} 
                    />
                </label>
                <label>Обкладинка:
                    <select value={cover} onChange={handleCoverChange}>
                        <option value="Тверда">Тверда</option>
                        <option value="М'яка">М'яка</option>
                        <option value="Суперобкладинка">Суперобкладинка</option>
                    </select>
                </label>
                <button onClick={handleRemove}>Видалити</button>
            </div>
        </div>
    );
};

export default CartItem;
