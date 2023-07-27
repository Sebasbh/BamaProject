import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { Link, useParams, useNavigate } from 'react-router-dom';

function DetalleAlbaranes() {
  const { id } = useParams();
  const [albaran, setAlbaran] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editarModo, setEditarModo] = useState(false);
  const [numero_de_albaran, setNumeroDeAlbaran] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fecha_albaran, setFechaAlbaran] = useState('');
  const [numero_de_pedido, setNumeroDePedido] = useState('');
  const [importe, setImporte] = useState('');
  const [estado, setEstado] = useState('');
  const [actualizacionExitosa, setActualizacionExitosa] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbaran = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/albaranes/${id}`);
        setAlbaran(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAlbaran();
  }, [id]);

  const editarDetalleAlbaran = () => {
    setEditarModo(true);
    setNumeroDeAlbaran(albaran.numero_de_albaran);
    setEmpresa(albaran.empresa);
    setFechaAlbaran(albaran.fecha_albaran);
    setNumeroDePedido(albaran.numero_de_pedido);
    setImporte(albaran.importe);
    setEstado(albaran.estado);
    setActualizacionExitosa(false);
  };

  const cancelarEdicion = () => {
    setEditarModo(false);
    setActualizacionExitosa(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const albaranActualizado = {
      numero_de_albaran,
      empresa,
      fecha_albaran,
      importe,
      numero_de_pedido,
      estado,
    };

    try {
      await axios.put(`http://localhost:8000/albaranes/${id}`, albaranActualizado);
      setActualizacionExitosa(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAlbaranes = () => {
    axios
      .delete(`http://localhost:8000/albaranes/${id}`)
      .then(response => {
        setAlbaran(null);
        alert('Albarán eliminado correctamente.');
        navigate('/GestionAlbaranes');
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Container>
        <Header />
        <Breadcrumb style={{ marginLeft: '180px', marginTop: '50px' }}>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/GestionAlbaranes">Albaranes</Breadcrumb.Item>
          <Breadcrumb.Item active>DetalleAlbaranes</Breadcrumb.Item>
        </Breadcrumb>

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
              <Container className="detalle-albaran">
                <Row className="botonesArriba">
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                  <Button variant="warning" className="botonEditar" size="sm" onClick={editarDetalleAlbaran}>
                    🖊️ Editar Albarán
                  </Button>
                  <Button
                    variant="danger"
                    className="botonEliminar"
                    size="sm"
                    onClick={deleteAlbaranes}
                  >
                    🗑️ Eliminar Albarán
                  </Button>
                  </div>

                </Row>
                <Row>
                  <Col>
                    <div>
                      <h1>Detalle del albarán</h1>
                      {editarModo ? (
                        <>
                          <Form onSubmit={handleSubmit}>
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
                            <Form.Group controlId="empresa">
                              <Form.Label>empresa</Form.Label>
                              <Form.Control
                                type="text"
                                value={empresa}
                                onChange={(e) => setEmpresa(e.target.value)}
                                style={{ width: '500px', height: '40px' }}
                              />
                            </Form.Group>
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
                            <Form.Group controlId="estado">
                              <Form.Label>Estado</Form.Label>
                              <Form.Control
                                as="select"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                                style={{ width: '500px', height: '40px' }}
                              >
                                <option value="">Seleccione una opción</option>
                                <option value="Firmado">Firmado</option>
                                <option value="No firmado">No firmado</option>
                              </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                              Guardar cambios
                            </Button>
                            <Button variant="secondary" onClick={cancelarEdicion}>
                              Cancelar
                            </Button>
                          </Form>
                          {actualizacionExitosa && (
                            <Alert variant="success" style={{ marginTop: '20px' }}>
                              Albarán actualizado correctamente.
                            </Alert>
                          )}
                        </>
                      ) : (
                        <>
                          {albaran ? (
                            <div>
                              <p>ID: {albaran._id}</p>
                              <p>NºAlbarán: {albaran.numero_de_albaran}</p>
                              <p>Empresa: {albaran.empresa}</p>
                              <p>Fecha: {albaran.fecha_albaran}</p>
                              <p>Importe: {albaran.importe}</p>
                              <p>Pedidos: {albaran.numero_de_pedido}</p>
                              <p>Entrega: {albaran.archivo_de_entrega}</p>
                              <p>Factura: {albaran.factura_id}</p>
                              <p>
                                Estado:{' '}
                                {albaran.estado === 'Firmado' ? (
                                  <span style={{ color: 'green' }}>🟢firmado</span>
                                ) : (
                                  <span style={{ color: 'red' }}>🔴No firmado</span>
                                )}
                              </p>
                            </div>
                          ) : (
                            <p>No se encontró el albarán.</p>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                            <Button variant="primary" className="botonPDF" size="sm" style={{ width: '120px' }}>
                              🧾 PDF
                            </Button>
                            <Button variant="success" className="botonDescargar" size="sm" style={{ width: '120px' }}>
                              📋 Descargar
                            </Button>
                          </div>
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
    </>
  );
}

export default DetalleAlbaranes;