import React from 'react';
import Header from '../components/Header/Header';
import Main from "../components/Main/Main";
import Grid from '../components/Grid/Grid';

import Footer from '../components/Footer/Footer';

function HomePage() {
  return (
    <div>
      <Header showSearch={false}/>
      <Main/>
      <Grid/>
      <Footer/>
      
    </div>
  );
}

export default HomePage;
