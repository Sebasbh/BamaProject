import React from 'react';
import '../Styles/footer.css';
import logoPelota from '../Components/assets/Images/logoPelota.png';


function Footer () {
    return (
        <div className='footer'>
            <h1 className='frase-footer'>
            <img src={logoPelota} alt="logoBama" className='logoPelota'/>
            "Generamos la ventaja competitiva que necesitas."</h1>
        </div>
    );
}

export default Footer