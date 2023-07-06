import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CrearPedido = () => {
  const [numeroPedido, setNumeroPedido] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');
  const [cliente, setCliente] = useState('');
  const [importe, setImporte] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numeroPedido || !fechaPedido || !cliente || !importe) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    try {
      const pedidoData = {
        numero: numeroPedido,
        fecha: fechaPedido,
        cliente: cliente,
        importe: importe
      };

      await axios.post('http://localhost:8000/pedidos', pedidoData);

      setNumeroPedido('');
      setFechaPedido('');
      setCliente('');
      setImporte('');

      alert('Pedido creado exitosamente');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Error al crear el pedido');
    }
  };

  return (
    <div>
      <h2>Crear Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="numeroPedido" className="form-label">Nº de Pedido</label>
          <input type="text" className="form-control" id="numeroPedido" value={numeroPedido} onChange={(e) => setNumeroPedido(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaPedido" className="form-label">Fecha de Pedido</label>
          <input type="date" className="form-control" id="fechaPedido" value={fechaPedido} onChange={(e) => setFechaPedido(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">Cliente</label>
          <input type="text" className="form-control" id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="importe" className="form-label">Importe</label>
          <input type="number" className="form-control" id="importe" value={importe} onChange={(e) => setImporte(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Crear Pedido</button>
        <Link to="/ListaPedido" className="btn btn-secondary ml-3">Volver a la lista</Link>
      </form>
    </div>
  );
};

export default CrearPedido;

