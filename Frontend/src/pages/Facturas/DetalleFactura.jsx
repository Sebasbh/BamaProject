import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../Components/footer/Footer';

function DetalleFactura() {
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtiene el id del URL
  const { id } = useParams();

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await axios.get(`${id}`);
        setFactura(response.data.data);
        setLoading(false);
        console.log(response.data.data.cliente)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchFactura();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles de la factura...</p>;
  }

  return (
    <div>
      <h1>Detalle de la Factura</h1>
      {factura ? (
        <div>
          <p>ID de la Factura: {factura.numero}</p>
          <p>Fecha: {factura.fecha}</p>
          <p>Cliente: {factura.cliente}</p>
          <p>Importe: {factura.importe}</p>
          <p>Estado: {factura.estado}</p>
        </div>
      ) : (
        <p>No se encontró la factura con el ID proporcionado.</p>
      )}
      <Footer/>
    </div>
  );
}

export default DetalleFactura;