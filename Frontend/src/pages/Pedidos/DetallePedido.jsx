import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';

function DetallePedido() {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/pedidos/${id}`);
        setPedido(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPedido();
  }, [id]);

  const handleEliminarPedido = async () => {
    try {
      await axios.delete(`http://localhost:8000/pedidos/${id}`);
      alert('Pedido eliminado exitosamente.');
      window.location.href = '/GestionPedidos';
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Cargando detalles del pedido...</p>;
  }

  return (
    <>
      <Container>
        <Header/>
        <Breadcrumb style={{ marginLeft: '180px', marginTop: '50px' }}>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/GestionPedidos">Pedidos</Breadcrumb.Item>
          <Breadcrumb.Item active>Detalle Pedido</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
          <Container fluid>
            <Row className="align-items-center" style={{ height: '50vh' }}>
              <Col xs={12} md={3} className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.gaInIGLRaOjETjvVoAOtqgAAAA&pid=Api&P=0&h=180"
                  className="pedido"
                  alt="pedido"
                  style={{ width: '100px', height: 'auto', marginBottom: '20px', marginRight: '10px' }}
                />
              </Col>
              <Col xs={12} md={9}>
                <Container className="detalle-pedido">
                  <Row className="botonesArriba" style={{ marginTop: '50px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                      <Button variant="warning" className="botonEditar" size="sm" style={{ width: '180px' }}>
                        🖊️ Editar Pedido
                      </Button>
                      <Button
                        variant="danger"
                        className="botonEliminar"
                        size="sm"
                        style={{ width: '180px' }}
                        onClick={handleEliminarPedido}
                      >
                        🗑️ Eliminar Pedido
                      </Button>
                    </div>
                  </Row>

                  <Row>
                    <Col>
                      <div>
                        <h1>Detalle del pedido</h1>
                        {pedido ? (
                          <div>
                            <p>Número de pedido: {pedido.numero_de_pedido}</p>
                            <p>Fecha de pedido: {pedido.fecha_de_pedido}</p>
                            <p>Empresa: {pedido.empresa}</p>
                            <p>Importe: {pedido.importe}</p>
                            <p>Archivo Adjunto: {pedido.archivo_adjunto}</p>
                            <p>Estado: {pedido.estado}</p>
                            <p>Total Facturado: {pedido.total_facturado}</p>
                          </div>
                        ) : (
                          <p>No se encontró el pedido con el ID proporcionado.</p>
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

export default DetallePedido;
