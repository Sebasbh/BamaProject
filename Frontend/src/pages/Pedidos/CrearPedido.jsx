import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const API_BASE_URL = 'http://localhost:8000';

const CrearPedido = () => {
  const [numeroPedido, setNumeroPedido] = useState(0);
  const [cliente, setCliente] = useState('');
  const [importe, setImporte] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchNextPedidoNumber = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pedidos/next-number`);
        setNumeroPedido(response.data.nextPedidoNumber);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNextPedidoNumber();
  }, []);

  const validateForm = () => {
    setError('');
    setSuccessMessage('');

    if (!numeroPedido || !cliente || !importe) {
      setError('Por favor, complete todos los campos del formulario.');
      return false;
    }

    const roundedImporte = parseFloat(importe).toFixed(2);
    const numberRegex = /^\d+(\.\d{1,2})?$/;
    if (!numberRegex.test(roundedImporte)) {
      setError('El importe debe ser un valor numérico válido.');
      return false;
    }

    return true;
  };

  const handleChangeCliente = (e) => {
    setCliente(e.target.value);
  };

  const handleChangeImporte = (e) => {
    setImporte(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('numero_de_pedido', numeroPedido);
    formData.append('cliente_id', cliente);
    formData.append('importe', parseFloat(importe).toFixed(2));

    axios
      .post(`${API_BASE_URL}/pedidos`, formData)
      .then((res) => {
        setSuccessMessage('¡Pedido creado exitosamente!');
        console.log(res.data);
      })
      .catch((err) => {
        setError('Error al crear el pedido. Por favor, inténtelo nuevamente.');
        if (err.response && err.response.data) {
          setError(err.response.data.error);
        }
        console.error(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNumeroPedido">
              <Form.Label>Número de pedido</Form.Label>
              <Form.Control type="text" readOnly value={numeroPedido} />
            </Form.Group>

            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el ID del cliente"
                value={cliente}
                onChange={handleChangeCliente}
              />
            </Form.Group>

            <Form.Group controlId="formImporte">
              <Form.Label>Importe</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Ingrese el importe del pedido"
                value={importe}
                onChange={handleChangeImporte}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Crear pedido'}
            </Button>

            <Link to="/GestionPedidos" className="btn btn-primary">
              Volver a la lista de pedidos
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPedido;
