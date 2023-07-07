import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormularioAlbaranes = () => {
  const [numero, setNumero] = useState('');
  const [importe, setImporte] = useState('');
  const [entregado, setEntregado] = useState(false);
  const [cliente, setCliente] = useState('');
  const [pedido, setPedido] = useState('');
  const [firmado, setFirmado] = useState(false);
  const [cif, setCif] = useState('');
  const [fecha, setFecha] = useState('');

 

  const handleSubmit = e => {
    e.preventDefault();

    // Crear el objeto albarán a enviar
    const albaran = {
      numero,
      importe,
      entregado,
      cliente,
      pedido,
      firmado,
      cif,
      fecha
    };

    // Enviar la solicitud POST para crear el albarán
    axios
      .post('http://localhost:8000/albaranes', albaran)
      .then(response => {
        console.log(response.data);
        // Redireccionar a la página de gestión de albaranes
        <Link to ='/GestionAlbaranes'></Link>
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Header />
      <Container className="parent-container">
        <h3 className="title">Formulario para crear los Albaranes</h3>
        <br /> <br />
        <Row>
          <Col className="left-container">
            <div className="block">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="numero">
                  <Form.Label>Nº Albaran</Form.Label>
                  <Form.Control
                    type="text"
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="importe">
                  <Form.Label>Importe</Form.Label>
                  <Form.Control
                    type="text"
                    value={importe}
                    onChange={e => setImporte(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="entregado">
                  <Form.Check
                    type="checkbox"
                    label="Entregado"
                    checked={entregado}
                    onChange={e => setEntregado(e.target.checked)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Crear Albarán
                </Button>
              </Form>
            </div>
          </Col>
          <Col className="middle-container">
            <div className="block">
              <Form.Group controlId="cliente">
                <Form.Label>Cliente</Form.Label>
                <Form.Control
                  type="text"
                  value={cliente}
                  onChange={e => setCliente(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="pedido">
                <Form.Label>Pedido</Form.Label>
                <Form.Control
                  type="text"
                  value={pedido}
                  onChange={e => setPedido(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="firmado">
                <Form.Check
                  type="checkbox"
                  label="Firmado"
                  checked={firmado}
                  onChange={e => setFirmado(e.target.checked)}
                />
              </Form.Group>
            </div>
          </Col>
          <Col className="right-container">
            <div className="albarans">
              <Form.Group controlId="cif">
                <Form.Label>CIF</Form.Label>
                <Form.Control
                  type="text"
                  value={cif}
                  onChange={e => setCif(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="fecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="text"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                />
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormularioAlbaranes;
