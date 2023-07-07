import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {  Button,  } from 'react-bootstrap';



const Filtro = () => {
    
    const [albaranes, setAlbaranes] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroImporte, setFiltroImporte] = useState('');


    useEffect(() => {
        // Llamada a la API al cargar el componente
        axios
            .get('http://localhost:8000/albaranes')
            .then(response => {
                // Aplica los filtros
                let albaranesFiltrados = response.data;

                if (filtroCliente) {
                    albaranesFiltrados = albaranesFiltrados.filter(albaran => albaran.cliente.includes(filtroCliente));
                }

                if (filtroFecha) {
                    albaranesFiltrados = albaranesFiltrados.filter(albaran => albaran.fecha.includes(filtroFecha));
                }

                if (filtroImporte) {
                    albaranesFiltrados = albaranesFiltrados.filter(albaran => albaran.importe.includes(filtroImporte));
                }

                setAlbaranes(albaranesFiltrados);
            })
            .catch(error => console.log(error));
    }, [filtroCliente, filtroFecha, filtroImporte]);

  return (
    <>
        <div className="d-flex justify-content-center my-3">
                <input type="text" placeholder="Cliente" value={filtroCliente} onChange={e => setFiltroCliente(e.target.value)} />
                <input type="text" placeholder="Fecha" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} />
                <input type="text" placeholder="Importe" value={filtroImporte} onChange={e => setFiltroImporte(e.target.value)} />
                <Button variant="primary" className="btn-sm" onClick={() => { setFiltroCliente(''); setFiltroFecha(''); setFiltroImporte(''); }}>Limpiar</Button>
            </div>


    </>
  )
}

export default Filtro
