import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
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
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [importe, setImporte] = useState('');
  const [numeroPedido, setNumeroPedido] = useState();
  const [pedidoCreado, setPedidoCreado] = useState(false);
  const [fechaPedido, setFechaPedido] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { clientes } = await fetchClientes();
        setClientes(clientes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!clienteSeleccionado || !importe || isNaN(numeroPedido)) {
      alert('Por favor, rellena todos los campos y asegúrate de ingresar un número de pedido válido.');
      return;
    }

    const newPedido = {
      numero_de_pedido: parseInt(numeroPedido),
      fecha_de_pedido: fechaPedido,
      empresa: clienteSeleccionado,
      importe: parseFloat(importe),
    };

    try {
      await api.post('/pedidos', newPedido);
      setPedidoCreado(true);
    } catch {
      alert('Error al crear el pedido. Por favor, inténtelo nuevamente.');
    }
  };

  const handleAceptarClick = () => {
    setPedidoCreado(false);
    navigate('/gestionpedidos');
  };

  return (
    <>
      <Container>
        <Header />
        <Breadcrumb style={{ marginLeft: '180px', marginTop: '50px' }}>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/GestionPedidos">Pedidos</Breadcrumb.Item>
          <Breadcrumb.Item active>Crear Pedido</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <div style={{ marginTop: '20px', marginBottom: '50px' }}>
        <Container className="d-flex align-items-center justify-content-center">
          <div>
            <h3 style={{ marginBottom: '30px' }}>Nuevo Pedido</h3>
            {pedidoCreado && (
              <Alert variant="success" className="mt-3">
                Pedido creado correctamente.
              </Alert>
            )}
            <Form onSubmit={onSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="numeroPedido">
                    <Form.Label>Número de Pedido</Form.Label>
                    <Form.Control
                      type="number"
                      value={numeroPedido}
                      onChange={(e) => setNumeroPedido(e.target.value)}
                      required
                      style={{ width: '500px', height: '40px' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="fechaPedido">
                    <Form.Label>Fecha de Pedido</Form.Label>
                    <Form.Control
                      type="date"
                      value={fechaPedido}
                      onChange={(e) => setFechaPedido(e.target.value)}
                      required
                      style={{ width: '500px', height: '40px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="cliente">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Select
                      value={clienteSeleccionado}
                      onChange={(e) => setClienteSeleccionado(e.target.value)}
                      required
                      style={{ width: '500px', height: '40px' }}
                    >
                      <option value="">Seleccione una opción</option>
                      {clientes.map((cliente) =>
                        <option key={cliente.CIF} value={cliente.empresa}>{cliente.empresa}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="importe">
                    <Form.Label>Importe</Form.Label>
                    <Form.Control
                      type="number"
                      value={importe}
                      onChange={(e) => setImporte(e.target.value)}
                      required
                      style={{ width: '500px', height: '40px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="mt-3">
                Crear Pedido
              </Button>
            </Form>
            {pedidoCreado && (
              <Button variant="success" className="mt-3" onClick={handleAceptarClick}>
                Aceptar
              </Button>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CrearPedido;