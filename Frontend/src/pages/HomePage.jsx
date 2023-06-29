import React from 'react';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import logoPelota from '../Components/assets/Images/logoPelota.png';
import arrow from '../Components/assets/Images/arrow.png';

function HomePage() {
  return (
    <div>
        <img src={logo} alt='logo' className='Logo'/>
        <h1 className='home'>Home</h1>
        <div className='btns'>
            <button className='clientes'><h1 className='clnts'>CLIENTES<img src={arrow} className='arrow'/></h1></button>
            <button className='facturas'><h1 className='facts'>FACTURAS<img src={arrow} className='arrow'/></h1></button>
            <button className='albaranes'><h1 className='albrns'>ALBARANES<img src={arrow} className='arrow'/></h1></button>
            <button className='pedidos'><h1 className='pdds'>PEDIDOS<img src={arrow} className='arrow'/></h1></button>
        </div>

        <div className='footer'>
          <h1 className='frase-footer'><img src={logoPelota} alt="logoBama" className='logoPelota'/>"Generamos la ventaja competitiva que necesitas."</h1>
        </div>
    </div>
  );
}

export default HomePage