import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="branding">
        <div>Зв'язок з нами</div>
        <p>З питань співпраці: zbut@starlev.com.ua</p>
        <p>Для наших клієнтів: spilnota@starlev.com.ua</p>
      </div>
      <div className="logo">
        <img src="/logo.jpg" alt="Видавництво Старого Лева" /> 
      </div>
      <div className="social-icons">
      <a href="#facebook" className="facebook">
        <img src="./facebook.svg" alt="Facebook" />
      </a>
      <a href="#twitter" className="twitter">
        <img src="./twitter.svg" alt="Twitter" /> 
      </a>
      <a href="#linkedin" className="linkedin">
        <img src="./instagram.svg" alt="LinkedIn" /> 
      </a>
      <a href="#google" className="google">
        <img src="./in.svg" alt="Google+" /> 
      </a>
    </div>
      <div className="copyright">
        <p>2020 IoT © Copyright all rights reserved, bla bla</p>
      </div>
    </footer>
  );
};

export default Footer;
