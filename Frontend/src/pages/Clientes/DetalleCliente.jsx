import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';


function DetalleCliente() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/clientes/${id}`);
        setCliente(res.data);
        setLoading(false);
        console.log(res.data.cliente);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  const handleEliminarCliente = async () => {
    try {
      await axios.delete(`http://localhost:8000/clientes/${id}`);
      // Mostrar mensaje de éxito
      alert('Cliente eliminado exitosamente.');
      // Redirigir a la página de gestión de clientes
      window.location.href = '/GestionClientes';
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Cargando detalles del cliente...</p>;
  }

  return (
    <>
    <Container>
      <Header/>
      <Breadcrumb style={{ marginLeft: '180px', marginTop: '50px' }}>
      <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="/GestionClientes">Clientes</Breadcrumb.Item>
        <Breadcrumb.Item active>Detalle Cliente</Breadcrumb.Item>
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
            <Container className="detalle-cliente">
              <Row className="botonesArriba" style={{ marginTop: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                  <Button variant="warning" className="botonEditar" size="sm" style={{ width: '180px' }}>
                    🖊️ Editar Cliente
                  </Button>
                  <Button
                    variant="danger"
                    className="botonEliminar"
                    size="sm"
                    style={{ width: '180px' }}
                    onClick={handleEliminarCliente}
                  >
                    🗑️ Eliminar Cliente
                  </Button>
                </div>
              </Row>

              <Row>
                <Col>
                  <div>
                    <h1>Detalle del cliente</h1>
                    {cliente ? (
                      <div>
                        <p>ID del Cliente: {cliente._id}</p>
                        <p>Nombre empresa: {cliente.empresa}</p>
                        <p>Direccion Social: {cliente.direccion_social}</p>
                        <p>CIF: {cliente.CIF}</p>
                        <p>Forma de pago: {cliente.forma_de_pago}</p>
                        <p>Fecha: {cliente.fecha_creacion}</p>
                        <p>
                          Activo:{' '}
                          {cliente.activo ? (
                            <span style={{ color: 'green' }}>🟢</span>
                          ) : (
                            <span style={{ color: 'red' }}>🔴</span>
                          )}
                        </p>
                        <p>pedidos ID: {cliente.pedidos_id}</p>
                      </div>
                    ) : (
                      <p>No se encontró el cliente con el ID proporcionado.</p>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="botonesAbajo">
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                  <Button variant="primary" className="botonFacturas" size="sm" style={{ width: '120px' }}>
                    🧾 Facturas
                  </Button>
                  <Button variant="success" className="botonPedidos" size="sm" style={{ width: '120px' }}>
                    📋 Pedidos
                  </Button>
                </div>
              </Row>
            </Container>
          </Col>
        </Row>
        </Container>
      </Container>
    </Container>
    </>
  );
}

export default DetalleCliente;

