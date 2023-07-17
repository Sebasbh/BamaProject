import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';

function FormularioAlbaranes() {
  const { id } = useParams();
  const [numero_de_albaran, setNumeroDeAlbaran] = useState('');
  const [cliente_id, setClienteId] = useState('');
  const [fecha_albaran, setFechaAlbaran] = useState('');
  const [pedido_id, setPedidoId] = useState('');
  const [importe, setImporte] = useState('');
  const [estado, setEstado] = useState('');
  const [albaranAgregado, setAlbaranAgregado] = useState(false); // Nuevo estado para el mensaje de albaran agregado
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const albaran = {
      numero_de_albaran,
      cliente_id,
      fecha_albaran,
      importe,
      pedido_id,
      estado,
    };

    try {
      const response = await axios.post('http://localhost:8000/albaranes', albaran);
      if (response.status === 201) {
        setAlbaranAgregado(true); // Actualizar el estado de albaranAgregado cuando se completa la solicitud
        alert('Albarán creado correctamente.');
        navigate('/GestionAlbaranes');
      } else {
        alert('Error al crear el albarán.');
      }
    } catch (error) {
      console.log(error);
      alert('Error al crear el albarán.');
    }
  };


  return (
    <>
      <Header />
      <Container className="d-flex align-items-center justify-content-center">
        <div>
          <h3>Crear Albaran Nuevo</h3>
          {albaranAgregado ? (
            <Alert variant="success">Albaran agregado correctamente.</Alert>
          ) : null}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="numero">
                  <Form.Label>NºAlbaran</Form.Label>
                  <Form.Control
                    type="text"
                    value={numero_de_albaran}
                    onChange={(e) => setNumeroDeAlbaran(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="clientes">
                  <Form.Label>cliente_id</Form.Label>
                  <Form.Control
                    type="text"
                    value={cliente_id}
                    onChange={(e) => setClienteId(e.target.value)}
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>fecha_albaran</Form.Label>
                  <Form.Control
                    type="text"
                    value={fecha_albaran}
                    onChange={(e) => setFechaAlbaran(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
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
            </Row>
            <Row className="mb-3">
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
                <Form.Group controlId="pedido">
                  <Form.Label>Pedido-id</Form.Label>
                  <Form.Control
                    type="text"
                    value={pedido_id}
                    onChange={(e) => setPedidoId(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Crear albaran
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default FormularioAlbaranes;






