import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="success-page">
            <h1>Замовлення успішно оформлено!</h1>
            <p>Дякуємо за ваш вибір. Ми зв’яжемося з вами найближчим часом.</p>
            <button className="home-button" onClick={() => navigate('/catalog')}>
                Повернутись до каталогу
            </button>
        </div>
    );
};

export default SuccessPage;