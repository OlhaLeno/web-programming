import React, { useState } from 'react';
import './CartItem.css';

const CartItem = ({ item, onCartUpdate }) => {
    const [numbers, setNumbers] = useState(item.numbers || 1);
    const [cover, setCover] = useState(item.cover || "Тверда");

    const defaultImage = '/stopka_books.png'; 

    const handleNumbersChange = (e) => {
        const updatedNumbers = Number(e.target.value);
        setNumbers(updatedNumbers);

        updateCartInLocalStorage(item.id, updatedNumbers, cover);
        onCartUpdate();
    };

    const handleCoverChange = (e) => {
        const updatedCover = e.target.value;
        setCover(updatedCover);

        updateCartInLocalStorage(item.id, numbers, updatedCover);
        onCartUpdate();
    };

    const updateCartInLocalStorage = (id, updatedNumbers, updatedCover) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(cartItem => 
            cartItem.id === id 
                ? { ...cartItem, numbers: updatedNumbers, cover: updatedCover } 
                : cartItem
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemove = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(cartItem => cartItem.id !== item.id);  
        localStorage.setItem('cart', JSON.stringify(cart));
        onCartUpdate();
    };

    const totalPrice = item.price * numbers;

    const imagePath = item.image ? `/images/${item.image}` : defaultImage; // Якщо є своє зображення, використовується воно

    return (
        <div className="cart-item">
            <div className="item-image">
                <img 
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
