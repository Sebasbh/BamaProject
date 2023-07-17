import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NuevoClienteFormulario = () => {
  const [empresa, setEmpresa] = useState('');
  const [pedidos, setPedidos] = useState('');
  const [direccionSocial, setDireccionSocial] = useState('');
  const [CIF, setCIF] = useState('');
  const [formaPago, setFormaPago] = useState('');
  const [activo, setActivo] = useState(true);
  const [clienteAgregado, setClienteAgregado] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto cliente a enviar
    const cliente = {
      empresa,
      pedidos,
      direccion_social: direccionSocial,
      CIF,
      forma_de_pago: formaPago,
      activo,
      fecha_creacion: new Date().toLocaleDateString(),
    };

    try {
      await axios.post('http://localhost:8000/clientes', cliente);
      setClienteAgregado(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAceptarClick = () => {
    setClienteAgregado(false);
    navigate('/gestionclientes');
  };

  return (
    <div style={{ marginTop: '150px', marginBottom: '50px' }}>
      <Container className="d-flex align-items-center justify-content-center">
        <div>
          <h3 style={{ marginBottom: '100px' }}>Nuevo Cliente</h3>
          {clienteAgregado && (
            <Alert variant="success" className="mt-3">
              Cliente agregado correctamente.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="empresa">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pedidos">
                  <Form.Label>Pedidos</Form.Label>
                  <Form.Control
                    type="text"
                    value={pedidos}
                    onChange={(e) => setPedidos(e.target.value)}
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="direccionSocial">
                  <Form.Label>Dirección Social</Form.Label>
                  <Form.Control
                    type="text"
                    value={direccionSocial}
                    onChange={(e) => setDireccionSocial(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="CIF">
                  <Form.Label>CIF</Form.Label>
                  <Form.Control
                    type="text"
                    value={CIF}
                    onChange={(e) => setCIF(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formaPago">
                  <Form.Label>Forma de Pago</Form.Label>
                  <Form.Select
                    value={formaPago}
                    onChange={(e) => setFormaPago(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Confirming">Confirming</option>
                    <option value="Giro Bancario">Giro Bancario</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="activo">
                  <Form.Check
                    type="checkbox"
                    label="Activo"
                    checked={activo}
                    onChange={(e) => setActivo(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Agregar Cliente
            </Button>
          </Form>
          {clienteAgregado && (
            <Button variant="success" className="mt-3" onClick={handleAceptarClick}>
              Aceptar
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default NuevoClienteFormulario;
