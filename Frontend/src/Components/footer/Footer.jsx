import React from 'react';
import '../../Styles/footer.css';
import logoPelota from '../assets/Images/logoPelota.png';
import 'bootstrap/dist/css/bootstrap.min.css';


function Footer() {
    return (
      <div className='footer bg-dark footer-height'> 
        <h1 className='frase-footer'>
          <img src={logoPelota} alt="logoBama" className='logoPelota' />
          "Generamos la ventaja competitiva que necesitas."
        </h1>
      </div>
    );
  }

  export default Footer;  