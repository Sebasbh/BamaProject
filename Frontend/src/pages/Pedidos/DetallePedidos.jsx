import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import './DetallePedidos.css'


function DetallePedidos() {
    return (
        <>
            <Header />
            <ul>
                <li>nombre_empresa = "Volkswagen"<br />
                 CIF = "A12345678"</li>
            
                <li>Importe de pedido:<br />
                 23454</li>
            
                <li>Numero de pedido:<br />
                 909340323</li>
            
                <li>Facturado:<br />
                 80%</li>
            </ul>


            <Footer />

        </>
    )
}

export default DetallePedidos