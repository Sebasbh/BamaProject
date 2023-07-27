import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, FormGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/footer/Footer';

function CrearFactura() {
  const [numeroDeFactura, setNumeroDeFactura] = useState('');
  const [cliente, setCliente] = useState('');
  const [fechaDeFactura, setFechaDeFactura] = useState('');
  const [vencimiento, setVencimiento] = useState ('');
  const [importeIVA, setImporteIVA] = useState('');
  const [baseImponible, setBaseImponible] = useState('');
  const [tipoDeIVA, setTipoDeIVA] = useState('');
  const [totalFactura, setTotalFactura] = useState('');
  const [estadoFactura, setEstadoFactura] = useState('');
  const [fechaDeCobro, setFechadeCobro] = useState('');
  const [pedido, setPedido] = useState('');
  const [albaran, setAlbaran] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos requeridos antes de enviar el formulario
    if (!numeroDeFactura || !fechaDeFactura || !cliente || !importeIVA || !vencimiento || !tipoDeIVA || !baseImponible || !totalFactura || !estadoFactura || !fechaDeCobro || !albaran || !pedido) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    setError('');
    setIsLoading(true);

    const factura = new FormData();
    factura.append('numero_de_factura', numeroDeFactura);
    factura.append('fecha_de_factura', fechaDeFactura);
    factura.append('cliente', cliente);
    factura.append('importeIVA', importeIVA);
    factura.append('archivo_adjunto', archivoAdjunto);
    factura.append('vencimiento', vencimiento);
    factura.append('base_imponible', baseImponible);
    factura.append('tipo_de_IVA', tipoDeIVA);
    factura.append('total_factura', totalFactura);
    factura.append('estado_factura', estadoFactura);
    factura.append('fecha_de_cobro', fechaDeCobro);
    factura.append('pedido', pedido);
    factura.append('albaran', albaran);

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
      <Form onSubmit={handleSubmit} >

        <Row>
        <Col sm={12} md={6}>
        <Form.Group controlId="numero_de_factura">
          <Form.Label className='mt-4'>Número de Factura:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setNumeroDeFactura(e.target.value)}
            required
          />
        </Form.Group>
        </Col> 

        <Col sm={12} md={6}>
        <Form.Group controlId="fecha_de_factura">
          <Form.Label className='mt-4'>Fecha de Factura:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setFechaDeFactura(e.target.value)}
            required
          />
        </Form.Group>
        </Col> 

        <Col sm={12} md={6}>
        <Form.Group controlId="fecha_de_cobro">
          <Form.Label className='mt-4'>Fecha de cobro:</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setFechadeCobro(e.target.value)}
            required
          />
        </Form.Group>
        </Col> 

        <Col sm={12} md={6}>
        <Form.Group controlId="cliente">
          <Form.Label className='mt-4'>Cliente:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </Form.Group>
        </Col> 

        <Col sm={12} md={6}>
        <Form.Group>
          <Form.Label className='mt-4'>Tipo de IVA:</Form.Label>
          <Form.Select
          type='select'              
          value={tipoDeIVA}
          onChange={(e) => setTipoDeIVA(e.target.value)}
          required
          >
          <option value="">Seleccione una opción</option>
          <option value="21%">21%</option>
          <option value="10%">10%</option>
          <option value="4%">4%</option>
          <option value="sin IVA">Sin IVA</option>
          </Form.Select>
        </Form.Group>
        </Col>

        <Col sm={12} md={6}>
        <Form.Group controlId="importe_IVA">
          <Form.Label className='mt-4'>Importe IVA:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setImporteIVA(e.target.value)}
            required
          />
        </Form.Group>
        </Col>
        </Row>

        <Row>
        <Col sm={12} md={6}>
        <Form.Group controlId="base_imponible">
          <Form.Label className='mt-4'>Base Imponible:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setBaseImponible(e.target.value)}
            required
          />
        </Form.Group>
        </Col>

        <Col sm={12} md={6}>
        <Form.Group>
          <Form.Label className='mt-4'>Adjuntar Archivo:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setArchivoAdjunto(e.target.files[0])}
          />
        </Form.Group>
        </Col>

        <Col sm={12} md={6}>
        <Form.Group>
          <Form.Label className='mt-4'>Vencimiento:</Form.Label>
          <Form.Select
          type='select'              
          value={vencimiento}
          onChange={(e) => setVencimiento(e.target.value)}
          required
          >
          <option value="">Seleccione una opción</option>
          <option value="Al contado">Al contado</option>
          <option value="30 dias">30 Días</option>
          <option value="60 dias">60 Días</option>
          </Form.Select>
        </Form.Group>
        </Col>

        <Col sm={12} md={6}>
        <Form.Group>
          <Form.Label className='mt-4'>Estado factura:</Form.Label>
          <Form.Select
          type='select'              
          value={estadoFactura}
          onChange={(e) => setEstadoFactura(e.target.value)}
          required
          >
          <option value="">Seleccione una opción</option>
          <option value="en tramite">En tramite</option>
          <option value="cerrada">Cerrada</option>
          </Form.Select>
        </Form.Group>
        </Col>

        <Col sm={12} md={6}>
        <Form.Group controlId="total_factura">
          <Form.Label className='mt-4'>Total factura:</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setTotalFactura(e.target.value)}
            required
          />
        </Form.Group>
        </Col>
        </Row>

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