import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Define la instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const fetchClientes = async () => {
  try {
    const [{ data: clientes }] = await Promise.all([
      api.get('/clientes'),
      
    ]);
    return { clientes };
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

  const [fechaPedido, setFechaPedido] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { clientes } = await fetchClientes();
        setClientes(clientes);
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

    if (!clienteSeleccionado || !importe || isNaN(numeroPedido)) {
      setError('Por favor, rellena todos los campos y asegúrate de ingresar un número de pedido válido.');
      return;
    }

    const newPedido = {
      numero_de_pedido: parseInt(numeroPedido),
      fecha_de_pedido: fechaPedido,
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
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="6" className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Card className="my-4">
            <Card.Header><h2>Crear Pedido</h2></Card.Header>
            <Card.Body>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="numeroPedido">
                  <Form.Label>Número de Pedido</Form.Label>
                  <Form.Control
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
                  <Form.Control type="number" value={importe} onChange={(e) => setImporte(e.target.value)} />
                </Form.Group>
                <Button variant="info" type="submit" disabled={loading} className="me-2">
                  <FontAwesomeIcon icon={faPlus} /> Crear Pedido
                </Button>
                <Link to="/GestionPedidos" className="btn btn-secondary">
                  <FontAwesomeIcon icon={faArrowLeft} /> Volver a la gestión de pedidos
                </Link>
                {pedidoCreado && (
                  <Link to={`/DetallePedido/${pedidoCreado._id}`} className="btn btn-success ml-2">
                    Ver detalles
                  </Link>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPedido;
