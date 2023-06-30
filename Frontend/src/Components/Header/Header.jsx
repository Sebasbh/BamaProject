import React from 'react'
import './Header.css'
import logo from '../assets/Images/logo.png';
import logoPelota from '../assets/Images/logoPelota.png';


function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt='logo' />
        </div>
        <ul className="navbar-menu">
          <li className='one'>Clientes</li>
          <li className='two'>Facturas</li>
          <li className='three'>Pedidos</li>
          <li className='four'>Albaranes</li>  
        </ul>
      </nav>
      <div className='footer'>
        <img src={logoPelota} alt="logoBama" className='logoPelota' /> 
        <h1 className='frase'>"Generamos la ventaja competitiva que necesitas."</h1>
      </div>
    </>
  )
}

export default Header