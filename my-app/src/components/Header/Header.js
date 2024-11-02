import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.jpg" alt="Видавництво Старого Лева" /> 
      </div>
      <nav>
        <ul>
          <li><a href="#home" className="nav-item active">Головна</a></li>
          <li><a href="#catalog" className="nav-item">Каталог</a></li>
          <li><a href="#cart" className="nav-item">Корзина</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
