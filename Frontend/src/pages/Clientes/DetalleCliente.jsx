import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function DetalleCliente() {
  const [cliente, setcliente] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtiene el id del URL
  const { id } = useParams();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/clientes/${id}`);
        setcliente(res.data);
        setLoading(false);
        console.log(res.data.cliente)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del cliente...</p>;
  }

  return (
    <div>
      <h1>Detalle del cliente</h1>
      {cliente ? (
        <div>
          <p>ID del Cliente: {cliente._id}</p>
          <p>Fecha: {cliente.empresa}</p>
          <p>Nombre empresa: {cliente.CIF_NIF}</p>
          <p>Importe: {cliente.forma_pago}</p>
          <p>Fecha de creación: {cliente.fecha_creacion}</p>
          <p>Razon Social: {cliente.razon_social}</p>
          <p>Direccion: {cliente.direccion}</p>
          
        </div>
      ) : (
        <p>No se encontró el cliente con el ID proporcionado.</p>
      )}
    </div>
  );
}

export default DetalleCliente;