import React from 'react';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import Footer from '../Components/footer/Footer';

function HomePage() {
  return (
    <div>
        <header>
          <img src={logo} alt='logo' className='Logo'/>
        </header>
        
        <div className='btns'>
            <button className='clientes'><h1>CLIENTES <h2>^</h2></h1></button>
            <button className='facturas'><h1>FACTURAS <h2>^</h2></h1></button>
            <button className='albaranes'><h1>ALBARANES <h2>^</h2></h1></button>
            <button className='pedidos'><h1>PEDIDOS <h2>^</h2></h1></button>
        </div>
        <Footer />
    </div>
  );
}

export default HomePage