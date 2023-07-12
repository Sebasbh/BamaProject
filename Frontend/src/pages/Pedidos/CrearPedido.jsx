import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CrearPedidos = () => {
  const [numeroDePedido, setNumeroDePedido] = useState('');
  const [fechaDePedido, setFechaDePedido] = useState('');
  const [cliente, setCliente] = useState('');
  const [importe, setImporte] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos requeridos antes de enviar el formulario
    if (!numeroDePedido || !fechaDePedido || !cliente || !importe) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    setError('');
    setIsLoading(true);

    const pedido = new FormData();
    pedido.append('numero_de_pedido', numeroDePedido);
    pedido.append('fecha_de_pedido', fechaDePedido);
    pedido.append('cliente', cliente);
    pedido.append('importe', importe);
    pedido.append('archivo_adjunto', archivoAdjunto);

    axios
      .post('http://localhost:8000/pedidos', pedido)
      .then((response) => {
        console.log(response.data);
        navigate('/GestionPedidos');
      })
      .catch((error) => {
        console.log(error);
        setError('Ocurrió un error al crear el pedido.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <h3>Registrar Pedido</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="numero_de_pedido">
          <Form.Label>Número de Pedido:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setNumeroDePedido(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="fecha_de_pedido">
          <Form.Label>Fecha de Pedido:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setFechaDePedido(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="cliente">
          <Form.Label>Cliente:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="importe">
          <Form.Label>Importe:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setImporte(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adjuntar Archivo:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setArchivoAdjunto(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Registrar Pedido'}
        </Button>
      </Form>
    </Container>
  );
};

export default CrearPedidos;
