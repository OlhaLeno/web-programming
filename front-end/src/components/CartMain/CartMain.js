import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';
import CartSummary from '../CartSummary/CartSummary';
import './CartMain.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleCartUpdate = () => {
        const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(updatedCart);
    };

    return (
        <div className="cart-page">
            <h1>Ваша корзина</h1>
            <div className="cart-items-list">
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <CartItem key={item.id || index} item={item} onCartUpdate={handleCartUpdate} />
                    ))
                ) : (
                    <p className="cart-empty-message">Корзина порожня</p>
                )}
            </div>
            <CartSummary cart={cart} />
        </div>
    );
};

export default Cart;
