import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, FormGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';


const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const fetchClientesPedidosAlbaranFacturaNumber = async () => {
  try {
    const response = await Promise.all([
      api.get('/clientes'),
      api.get('/pedidos'),
      api.get('/albaranes'),
      api.get('/facturas/next-number')
    ]);

    const clientes = response[0].data;
    const pedidos = response[1].data;
    const albaran = response[2].data;
    const nextFacturaNumber = response[3].data.nextFacturaNumber;

    return { clientes, pedidos, albaran, nextFacturaNumber };
  } catch (error) {
    console.error(error); 
    throw new Error('Error al cargar los datos.');
  }
};

function CrearFactura() {
  const [numeroDeFactura, setNumeroDeFactura] = useState('');
  const [cliente, setCliente] = useState('');
  const [fechaDeFactura, setFechaDeFactura] = useState('');
  const [vencimiento, setVencimiento] = useState('');
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
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { clientes, pedidos, albaran, nextFacturaNumber } = await fetchClientesPedidosAlbaranFacturaNumber();
        setCliente(clientes); 
        setPedido(pedidos);
        setAlbaran(albaran);
        setFechaDeFactura(nextFacturaNumber);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!cliente || !fechaDeFactura || !vencimiento || !baseImponible || !tipoDeIVA || !importeIVA || !totalFactura || !estadoFactura || !fechaDeCobro || !pedido || !albaran) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

   
    const isApproved = true; //


    const newFactura = {
      numero_de_factura: numeroDeFactura,
      cliente: cliente,
      fecha_de_factura: new Date(fechaDeFactura), // Convert the fecha to a Date object
      vencimiento: vencimiento,
      base_imponible: baseImponible,
      tipo_de_IVA: tipoDeIVA,
      importe_IVA: importeIVA,
      total_factura: totalFactura,
      estado_factura: estadoFactura,
      fecha_de_cobro: new Date(fechaDeCobro), 
      archivo_de_adjunto: '',
      estado: estadoFactura,
      isApproved: isApproved, 
    };

    setIsLoading(true);
    try {
      const { data } = await api.post('/facturas', newFactura);
      setMessage('¡Factura creada correctamente!');
      
      setNumeroDeFactura('');
      setCliente('');
      setFechaDeFactura('');
      setVencimiento('');
      setImporteIVA('');
      setBaseImponible('');
      setTipoDeIVA('');
      setTotalFactura('');
      setEstadoFactura('');
      setFechadeCobro('');
      setPedido('');
      setAlbaran('');
      setArchivoAdjunto(null);
      setError(null);
    } catch (error) {
      setError('Error al crear la factura. Por favor, inténtelo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
    <Header/>
    <div style={{ marginTop: '20px', marginBottom: '50px' }}>
    <Container className='justify-content-center mt-5'>
      <h3>Registrar Factura</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>

        <Row>
        <Col sm={12} md={6}>
        <Form.Group controlId="numero_de_factura">
          <Form.Label className='mt-4'>Número de Factura:</Form.Label>
          <Form.Control
            type="number"
            value={numeroDeFactura} 
            readOnly
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
      </div>
    </Container>
  );
}


export default CrearFactura;