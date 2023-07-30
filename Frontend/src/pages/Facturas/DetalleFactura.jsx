import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';

const DetalleFactura = () => {
  const [factura, setFactura] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editarModo, setEditarModo] = useState(false);
  const [numero_de_factura, setNumeroDeFactura] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fecha_de_factura, setFechaDeFactura] = useState('');
  const [importeIva, setImporteIva] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [baseImponible, setBaseImponible] = useState('');
  const [tipoDeIva, setTipoDeIva] = useState('');
  const [totalFactura, setTotalFactura] = useState('');
  const [estadoFactura, setEstadoFactura] = useState('');
  const [actualizacionExitosa, setActualizacionExitosa] = useState(false);

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/facturas/${id}`);
        setFactura(response.data);
        setNumeroDeFactura(response.data.numero_de_factura);
        setEmpresa(response.data.empresa);
        setFechaDeFactura(response.data.fecha_de_factura);
        setImporteIva(response.data.importe_IVA);
        setVencimiento(response.data.vencimiento);
        setBaseImponible(response.data.base_imponible);
        setTipoDeIva(response.data.tipo_de_IVA);
        setTotalFactura(response.data.total_factura);
        setEstadoFactura(response.data.estado_factura);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchFactura();
  }, [id]);

  const handleEliminarFactura = async () => {
    try {
      await axios.delete(`http://localhost:8000/facturas/${id}`);
      alert('Factura eliminada exitosamente.');
      navigate('/GestionFactura');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FacturaActualizado = {
      numero_de_factura,
      empresa,
      fecha_de_factura,
      vencimiento,
      importe: importeIva,
      base_imponible: baseImponible, 
      tipo_de_IVA: tipoDeIva, 
      total_factura: totalFactura, 
      estado: estadoFactura, 
    };

    try {
      await axios.put(`http://localhost:8000/facturas/${id}`, FacturaActualizado);
      setActualizacionExitosa(true);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelarEdicion = () => {
    setEditarModo(false);
    setActualizacionExitosa(false);
    setNumeroDeFactura(factura.numero_de_factura);
    setEmpresa(factura.empresa);
    setFechaDeFactura(factura.fecha_de_factura);
    setImporteIva(factura.importe_IVA);
    setVencimiento(factura.vencimiento);
    setBaseImponible(factura.base_imponible);
    setTipoDeIva(factura.tipo_de_IVA);
    setTotalFactura(factura.total_factura);
    setEstadoFactura(factura.estado_factura);
  };

  return (
    <>
      <Container>
        <Header />
        <Breadcrumb style={{ marginLeft: '100px', marginTop: '20px' }}>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/GestionFactura">Facturas</Breadcrumb.Item>
          <Breadcrumb.Item active>DetalleFactura</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
          <Container fluid>
            <Row className="align-items-center" style={{ height: '50vh' }}>
              <Col xs={12} md={3} className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.gaInIGLRaOjETjvVoAOtqgAAAA&pid=Api&P=0&h=180"
                  className="empresa"
                  alt="empresa"
                  style={{ width: '100px', height: 'auto', marginBottom: '20px', marginRight: '10px' }}
                />
              </Col>
              <Col xs={12} md={9}>
                <Container className="detalle-factura">
                  <Row className="botonesArriba" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                      {editarModo ? (
                        <>

                          <Button
                            variant="secondary"
                            className="botonAceptar"
                            size="sm"
                            onClick={cancelarEdicion}
                          >
                            Cancelar
                          </Button>

                        </>
                      ) : (
                        <Button
                          variant="warning"
                          className="botonEditar"
                          size="sm"
                          style={{ width: '180px' }}
                          onClick={() => setEditarModo(true)}
                        >
                          🖊️ Editar Factura
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        className="botonEliminar"
                        size="sm"
                        style={{ width: '180px' }}
                        onClick={handleEliminarFactura}
                      >
                        🗑️ Eliminar Factura
                      </Button>
                    </div>
                  </Row>
                  <Row>
                    <Col>
                      <div>
                        <h1>Detalle de la Factura</h1>
                        {editarModo ? (
                          <>
                            <Row className="form-separado">
                              <Col md={6}>
                                <Form onSubmit={handleSubmit}>
                                  <Form.Group controlId="numero">
                                    <Form.Label>NºFactura</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={numero_de_factura}
                                      onChange={(e) => setNumeroDeFactura(e.target.value)}
                                      required
                                      style={{ width: '500px', height: '40px', gap: '20px' }}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="empresa">
                                    <Form.Label>Empresa</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={empresa}
                                      onChange={(e) => setEmpresa(e.target.value)}
                                      style={{ width: '500px', height: '40px' }}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="fecha">
                                    <Form.Label>Fecha de factura</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={fecha_de_factura}
                                      onChange={(e) => setFechaDeFactura(e.target.value)}
                                      required
                                      style={{ width: '500px', height: '40px' }}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="importeIva">
                                    <Form.Label>Importe IVA</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={importeIva}
                                      onChange={(e) => setImporteIva(e.target.value)}
                                      required
                                      style={{ width: '500px', height: '40px' }}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="vencimiento">
                                    <Form.Label>Vencimiento</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={vencimiento}
                                      onChange={(e) => setVencimiento(e.target.value)}
                                      required
                                      style={{ width: '500px', height: '40px' }}
                                    />
                                  </Form.Group>
                                </Form>
                              </Col>
                              <Col md={6}>
                                <Form onSubmit={handleSubmit}>
                                  <Form.Group controlId="totalFactura">
                                    <Form.Label>Total Factura</Form.Label>
                                    <Form.Control
                                      type="text"
                                      value={totalFactura}
                                      onChange={(e) => setTotalFactura(e.target.value)}
                                      required
                                      style={{ width: '500px', height: '40px' }}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="estadoFactura">
                                    <Form.Label>Estado Factura</Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={estadoFactura}
                                      onChange={(e) => setEstadoFactura(e.target.value)}
                                      required
                                      style={{ width: '500px', height: '40px' }}
                                    >
                                      <option value="">Seleccione una opción</option>
                                      <option value="En Tramite">En Tramite</option>
                                      <option value="Cerrado">Cerrado</option>
                                    </Form.Control>
                                  </Form.Group>
                                </Form>
                              </Col>
                            </Row>

                            <Link to="/GestionFactura" 
                            className="btn btn-secondary" 
                            size="sm" alieg-items="center" style={{ width: '150px', height: '32px'}}>
                              Aceptar
                            </Link>

                            <Button
                              variant="primary"
                              className="botonEditar" size="sm"
                              onClick={handleSubmit}>Guardar Cambios</Button>

                              {actualizacionExitosa && (
                              <Alert variant="success" style={{ marginTop: '20px' }}>
                                Factura actualizada correctamente.
                              </Alert>
                            )}


                          </>
                        ) : (
                          <>
                            {factura ? (
                              <div>
                                <p>Factura #{factura.numero_de_factura}</p>
                                <p>Empresa: {factura.empresa}</p>
                                <p>Fecha de factura: {factura.fecha_de_factura}</p>
                                <p>Vencimiento: {factura.vencimiento}</p>
                                <p>Importe de IVA: {factura.importe_IVA}</p>
                                <p>Total factura: {factura.total_factura}</p>
                                <p>
                                  Estado de la factura:{' '}
                                  {factura.estado_factura === 'En Tramite' ? (
                                    <span style={{ color: 'green' }}>🟢 En Tramite</span>
                                  ) : (
                                    <span style={{ color: 'red' }}>🔴 Cerrado</span>
                                  )}
                                </p>
                                <p>
                                  Archivo de factura: <a href={factura.archivo_de_factura}>Ver factura</a>
                                </p>
                              </div>
                            ) : (
                              <p>Cargando factura...</p>
                            )}
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default DetalleFactura;
