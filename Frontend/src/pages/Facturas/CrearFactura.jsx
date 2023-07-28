import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const fetchClientesPedidosAlbaranesFacturaNumber = async () => {
  try {
    const response = await Promise.all([
      api.get('/clientes'),
      api.get('/pedidos'),
      api.get('/albaranes'),
      api.get('/facturas/next/number')
    ]);

    const clientes = response[0].data;
    const pedidos = response[1].data;
    const albaranes = response[2].data;
    const nextFacturaNumber = response[3].data.nextFacturaNumber;

    return { clientes, pedidos, albaranes, nextFacturaNumber };
  } catch (error) {
    console.error(error);
    throw new Error('Error al cargar los datos.');
  }
};

function CrearFactura() {
  const [numeroDeFactura, setNumeroDeFactura] = useState('');
  const [fechaDeFactura, setFechaDeFactura] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [pedidos, setPedidos] = useState(null);
  const [albaranes, setAlbaranes] = useState(null);
  const [importe, setImporte] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState('');
  const [albaranSeleccionado, setAlbaranSeleccionado] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaCobro, setFechaCobro] = useState('');
  const [numeroFactura, setNumeroFactura] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { clientes, pedidos, albaranes, nextFacturaNumber } = await fetchClientesPedidosAlbaranesFacturaNumber();
        setClientes(clientes);
        setPedidos(pedidos);
        setAlbaranes(albaranes);
        setNumeroDeFactura(nextFacturaNumber);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos requeridos antes de enviar el formulario
    if (!numeroDeFactura || !fechaDeFactura || !clienteSeleccionado || !importe || !fechaCobro) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Determine the value of isApproved based on some condition in your application
    const isApproved = true; // or false, depending on whether the factura is Firmado or No firmado

    const newFactura = {
      numero_de_factura: numeroDeFactura,
      empresa: clienteSeleccionado,
      importe: parseFloat(importe),
      numero_de_pedido: parseInt(pedidoSeleccionado),
      archivo_de_entrega: '', // Add the value for the archivo_de_entrega field
      estado: estado,
      fecha_factura: new Date(fechaDeFactura), // Convert the fecha to a Date object
      isApproved: isApproved, // Set the isApproved field to false by default
    };

    setLoading(true);
    try {
      const { data: { factura } } = await api.post('/facturas', newFactura);
      setError(null);
      setNumeroDeFactura('');
      setFechaDeFactura('');
      setClienteSeleccionado('');
      setImporte('');
      setPedidoSeleccionado('');
      setAlbaranSeleccionado('');
      setEstado('');
      setFechaCobro('');
      setArchivoAdjunto(null);
      setLoading(false);

      navigate('/GestionFactura');

    } catch (error) {
      setError('Error al crear la factura. Por favor, inténtelo nuevamente.');
      setLoading(false);
    }
  };

  if (loading) {
    // Render a loading message or spinner while data is being fetched
    return <div>Loading...</div>;
  }



  return (
    <div>
      <Header />
      <Breadcrumb style={{ marginLeft: '100px', marginTop: '20px' }}>
        <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="http://localhost:3000/GestionFactura">Facturas</Breadcrumb.Item>
        <Breadcrumb.Item active>CrearFactura</Breadcrumb.Item>
      </Breadcrumb>
      <Container className='justify-content-center mt-3'>
        <h3>Crear Factura</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="numeroFactura">
                <Form.Label>Numero de Factura</Form.Label>
                <Form.Control
                  type="text"
                  value={numeroDeFactura}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="clientes">
                <Form.Label className='mt-3'>Empresa</Form.Label>
                <Form.Control
                  as="select"
                  value={clienteSeleccionado}
                  onChange={(e) => setClienteSeleccionado(e.target.value)}
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
            <Col md={6}>
              <Form.Group controlId="estado">
                <Form.Label className='mt-3'>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value="en tramite">En tramite</option>
                  <option value="cerrado">Cerrado</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="fecha_de_factura">
                <Form.Label className='mt-3'>Fecha de Factura:</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaDeFactura}
                  onChange={(e) => setFechaDeFactura(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="vencimiento">
                <Form.Label className='mt-3'>Vencimiento</Form.Label>
                <Form.Control
                  type="date" // Use type="date" for date fields
                  value={fechaCobro}
                  onChange={(e) => setFechaCobro(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="importe">
                <Form.Label className='mt-3'>Importe</Form.Label>
                <Form.Control
                  type="number"
                  value={importe}
                  onChange={(e) => setImporte(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="pedidos">
                <Form.Label className='mt-3'>NºPedido</Form.Label>
                <Form.Control
                  as="select"
                  value={pedidoSeleccionado}
                  onChange={(e) => setPedidoSeleccionado(e.target.value)}
                >
                  <option value="">Selecciona un pedido</option>
                  {/* Check if pedidos is not null before mapping through it */}
                  {pedidos !== null &&
                    pedidos.map((pedido) => (
                      <option key={pedido.numero_de_pedido} value={pedido.numero_de_pedido}>
                        {pedido.numero_de_pedido}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="albaran">
                <Form.Label className='mt-3'>NºAlbaran</Form.Label>
                <Form.Control
                  as="select"
                  value={albaranSeleccionado}
                  onChange={(e) => setAlbaranSeleccionado(e.target.value)}
                >
                  <option value="">Selecciona un albaran</option>
                  {/* Check if pedidos is not null before mapping through it */}
                  {albaranes !== null &&
                    albaranes.map((albaran) => (
                      <option key={albaran.numero_de_albaran} value={albaran.numero_de_albaran}>
                        {albaran.numero_de_albaran}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
        
            <Col md={6}>
              <Form.Group controlId="fecha_cobro">
                <Form.Label className='mt-3'>Fecha Cobro</Form.Label>
                <Form.Control
                  type="date" // Use type="date" for date fields
                  value={fechaCobro}
                  onChange={(e) => setFechaCobro(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className='mt-3' variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Crear Factura'}
          </Button>
          <Link to="/GestionFactura" className="btn btn-secondary mt-3 ms-3">
            Aceptar
          </Link>
        </Form>
      </Container>
    </div>
  );
}

export default CrearFactura;
