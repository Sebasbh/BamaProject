import React from 'react';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import logoPelota from '../Components/assets/Images/logoPelota.png';

function HomePage() {
  return (
    <div className='home'>Home

        <div className='btn'>
            <button>Clientes</button>
            <button>Facturas</button>
            <button>Albaranes</button>
            <button>Pedidos</button>
        </div>
    </div>
  );
}

export default HomePage