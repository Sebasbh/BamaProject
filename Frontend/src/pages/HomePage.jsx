import React from 'react';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import arrow from '../Components/assets/Images/arrow.png';
import Footer from './Footer';

function HomePage() {
  return (
    <div>
        <img src={logo} alt='logo' className='Logo'/>
        <h1 className='home'>Home</h1>
        <div className='btns'>
            <button className='clientes'><h1>CLIENTES<img src={arrow} className='arrow'/></h1></button>
            <button className='facturas'><h1>FACTURAS<img src={arrow} className='arrow'/></h1></button>
            <button className='albaranes'><h1>ALBARANES<img src={arrow} className='arrow'/></h1></button>
            <button className='pedidos'><h1>PEDIDOS<img src={arrow} className='arrow'/></h1></button>
        </div>
        <Footer />
    </div>
  );
}

export default HomePage