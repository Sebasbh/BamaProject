import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Define la instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const fetchClientesAndPedidoNumber = async () => {
  try {
    const [{ data: clientes }, { data: { nextPedidoNumber } }] = await Promise.all([
      api.get('/clientes'),
      api.get('/pedidos/next-number')
    ]);
    return { clientes, nextPedidoNumber };
  } catch (error) {
    throw new Error('Error al cargar los datos.');
  }
};

const CrearPedido = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [importe, setImporte] = useState('');
  const [numeroPedido, setNumeroPedido] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [pedidoCreado, setPedidoCreado] = useState(null);

  // Nuevo estado para la fecha
  const [fechaPedido, setFechaPedido] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { clientes, nextPedidoNumber } = await fetchClientesAndPedidoNumber();
        setClientes(clientes);
        setNumeroPedido(nextPedidoNumber);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!clienteSeleccionado || !importe || isNaN(numeroPedido)) { // Validar que el número de pedido también sea un número válido
      setError('Por favor, rellena todos los campos y asegúrate de ingresar un número de pedido válido.');
      return;
    }

    const newPedido = {
      numero_de_pedido: parseInt(numeroPedido),
      fecha_de_pedido: fechaPedido,  // Añade la fecha
      empresa: clienteSeleccionado,
      importe: parseFloat(importe),
    };

    setLoading(true);
    try {
      const { data: { pedido } } = await api.post('/pedidos', newPedido);
      setMessage('¡Pedido creado correctamente!');
      setClienteSeleccionado('');
      setImporte('');
      setError(null);
      setPedidoCreado(pedido);
    } catch {
      setError('Error al crear el pedido. Por favor, inténtelo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crear Pedido</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="numeroPedido">
          <Form.Label>Número de Pedido</Form.Label>
          <input
            className="form-control"
            type="number"
            value={numeroPedido}
            onChange={(e) => setNumeroPedido(parseInt(e.target.value))}
            placeholder="Ingrese el número de pedido"
          />
        </Form.Group>
        <Form.Group controlId="fechaPedido">
          <Form.Label>Fecha de Pedido</Form.Label>
          <Form.Control type="date" value={fechaPedido} onChange={(e) => setFechaPedido(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="cliente">
          <Form.Label>Empresa</Form.Label>
          <Form.Control as="select" value={clienteSeleccionado} onChange={(e) => setClienteSeleccionado(e.target.value)}>
            <option value="">Selecciona una empresa</option>
            {clientes.map((cliente) =>
              <option key={cliente.CIF} value={cliente.empresa}>{cliente.empresa}</option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="importe">
          <Form.Label>Importe</Form.Label>
          <Form.Control className="form-control" type="number" value={importe} onChange={(e) => setImporte(e.target.value)} />
          <option value="">Selecciona una precio</option>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Crear Pedido
        </Button>
        <Link to="/GestionPedidos" className="btn btn-secondary ml-2">
          Volver a la gestión de pedidos
        </Link>
        {pedidoCreado && (
          <Link to={`/DetallePedido/${pedidoCreado._id}`} className="btn btn-primary ml-2">
            Ver detalles
          </Link>
        )}
      </Form>
    </div>
  );
};

export default CrearPedido;
