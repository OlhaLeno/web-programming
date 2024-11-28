import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartSummary.css';

const CartSummary = ({ cart }) => {
    const navigate = useNavigate();

    const totalAmount = cart.reduce((total, item) => {
        const priceMultiplier = item.cover === "Тверда" ? 1 : item.cover === "М'яка" ? 0.9 : 1.1;
        const itemTotalPrice = item.price * item.numbers * priceMultiplier;
        return total + itemTotalPrice;
    }, 0);
    

    return (
        <div className="cart-summary">
            <p>Сума: {totalAmount} грн</p>
            <button className="back-button" onClick={() => navigate('/catalog')}>Повернутись до каталогу</button>
            <button className="continue-button" onClick={() => navigate('/checkout')}>Замовити</button>
        </div>
    );
};

export default CartSummary;
