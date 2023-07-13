import React from 'react';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import Footer from './Footer';

function HomePage() {
  return (
    <div>
        <img src={logo} alt='logo' className='Logo'/>
        <h1 className='home'>Home</h1>
        <header>
          <img src={logo} alt='logo' className='Logo'/>
        </header>
        
        <div className='btns'>
            <button className='clientes'><h1 className='clnts'>CLIENTES</h1></button>
            <button className='facturas'><h1 className='facts'>FACTURAS</h1></button>
            <button className='albaranes'><h1 className='albrns'>ALBARANES</h1></button>
            <button className='pedidos'><h1 className='pdds'>PEDIDOS</h1></button>
        </div>
        <Footer />
    </div>
  );
}

export default HomePage