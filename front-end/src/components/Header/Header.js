import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
function Header  ({showSearch,onSearchChange})  {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.jpg" alt="Видавництво Старого Лева" /> 
      </div>
      <nav>
        <ul>
          <li><NavLink to='/' className="nav-item">Головна</NavLink></li>
          <li><NavLink to="/catalog" className="nav-item">Каталог</NavLink></li>
          <li><a href="#cart" className="nav-item">Корзина</a></li>
          <li>
             {showSearch && (
            <input 
                type="text"
                placeholder="Пошук"
                className="search-bar"
                onChange={(e) => onSearchChange(e.target.value)}
                />
          )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
