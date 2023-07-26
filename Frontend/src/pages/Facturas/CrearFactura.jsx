import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/footer/Footer';

function CrearFactura() {
    const [numeroDeFactura, setNumeroDeFactura] = useState('');
  const [fechaDeFactura, setFechaDeFactura] = useState('');
  const [cliente, setCliente] = useState('');
  const [importe, setImporte] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos requeridos antes de enviar el formulario
    if (!numeroDeFactura || !fechaDeFactura || !cliente || !importe) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    setError('');
    setIsLoading(true);

    const factura = new FormData();
    factura.append('numero_de_pedido', numeroDeFactura);
    factura.append('fecha_de_pedido', fechaDeFactura);
    factura.append('cliente', cliente);
    factura.append('importe', importe);
    factura.append('archivo_adjunto', archivoAdjunto);

    axios
      .post('', factura)
      .then((response) => {
        console.log(response.data);
        navigate('/GestionFactura');
      })
      .catch((error) => {
        console.error(error);
        /* setError('Ocurrió un error al crear la factura.'); */
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
    <Container className='justify-content-center mt-5'>
      <h3>Registrar Factura</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="numero_de_factura">
          <Form.Label className='mt-4'>Número de Factura:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setNumeroDeFactura(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="fecha_de_factura">
          <Form.Label className='mt-4'>Fecha de Factura:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setFechaDeFactura(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="cliente">
          <Form.Label className='mt-4'>Cliente:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="importe">
          <Form.Label className='mt-4'>Importe:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setImporte(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className='mt-4'>Adjuntar Archivo:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setArchivoAdjunto(e.target.files[0])}
          />
        </Form.Group>

        <Button className='mt-5' variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Registrar Factura'}
        </Button>
      </Form> 
    </Container>
    <Footer />
    </div>
  );
};


export default CrearFactura