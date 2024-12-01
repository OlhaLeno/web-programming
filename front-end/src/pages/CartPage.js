import React from "react";
import Header from '../components/Header/Header';
import CartMain from '../components/CartMain/CartMain';
import Footer from '../components/Footer/Footer';

const Homepage = () => {
    return (
        <div>
            <Header showSearch={false} />
            <CartMain/>
            <Footer/>

        </div>
    );
};

export default Homepage;