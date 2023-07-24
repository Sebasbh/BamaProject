import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';

// Define la instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const fetchClientesPedidosAlbaranNumber = async () => {
  try {
    const response = await Promise.all([
      api.get('/clientes'),
      api.get('/pedidos'),
      api.get('/Albaranes/next-number')
    ]);

    const clientes = response[0].data; // Obtener los clientes de la primera respuesta
    const pedidos = response[1].data.pedidos; // Obtener los pedidos de la segunda respuesta
    const nextAlbaranNumber = response[2].data.nextAlbaranNumber; // Obtener el próximo número de albarán de la tercera respuesta

    return { clientes, pedidos, nextAlbaranNumber };
  } catch (error) {
    throw new Error('Error al cargar los datos.');
  }
};

function FormularioAlbaranes() {
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [importe, setImporte] = useState('');
  const [numeroAlbaran, setNumeroAlbaran] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('boleano');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { clientes, pedidos, nextAlbaranNumber } = await fetchClientesPedidosAlbaranNumber();
        setClientes(clientes);
        setPedidos(pedidos);
        setNumeroAlbaran(nextAlbaranNumber);
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

    if (!clienteSeleccionado || !importe || !pedidos || !clientes) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    const newAlbaran = {
      empresa: clienteSeleccionado,
      importe: parseFloat(importe),
      pedidos: [pedidos],
      clientes: [clientes]
    };

    setLoading(true);
    try {
      const { data: { albaran } } = await api.post('/albaranes', newAlbaran);
      setMessage('¡Albaran creado correctamente!');
      setClienteSeleccionado('');
      setImporte('');
      setError(null);
    } catch {
      setError('Error al crear el pedido. Por favor, inténtelo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="d-flex align-items-center justify-content-center">
        <div>
          <h3>Crear Nuevo Albaran</h3>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="numeroAlbaran">
                  <Form.Label>Número de Albaran</Form.Label>
                  <Form.Control type="text" value={numeroAlbaran} readOnly />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="clientes">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    as="select"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    style={{ width: '500px', height: '40px' }}
                  >
                    <option value="">Selecciona una empresa</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.CIF} value={cliente.empresa}>
                        {cliente.empresa}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="importe">
                  <Form.Label>Importe</Form.Label>
                  <Form.Control
                    type="text"
                    value={importe}
                    onChange={(e) => setImporte(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Firmado">Firmado</option>
                    <option value="No firmado">No firmado</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="pedido">
                  <Form.Label>Pedidos</Form.Label>
                  <Form.Control
                    type="text"
                    value={pedidos}
                    onChange={(e) => setPedidos(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? 'Creando Albaran...' : 'Crear Albaran'}
            </Button>
            <Link to="/GestionAlbaranes" className="btn btn-secondary mt-3 ms-3">
              Cancelar
            </Link>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default FormularioAlbaranes;







