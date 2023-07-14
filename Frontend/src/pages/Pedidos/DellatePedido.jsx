import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
//import Footer from '../../Components/footer/Footer';

function DetallePedido() {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [importe, setImporte] = useState('');

  // Obtiene el id del URL
  const { id } = useParams();

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pedidos/${id}`);
        setPedido(response.data);
        setLoading(false);
        setImporte(response.data.importe);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPedido();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del pedido...</p>;
  }

  const handleImporteChange = (event) => {
    setImporte(event.target.value);
  };

  const guardarCambios = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/pedidos/${id}`, {
        importe: importe,
        // Agrega los demás campos editables aquí
      });
      setPedido(response.data);
      console.log('Pedido actualizado:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h2" className="text-center bg-primary text-white">
              Detalle del Pedido
            </Card.Header>
            <Card.Body>
              {pedido ? (
                <>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Número de pedido:</strong> {pedido.numero_de_pedido}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Fecha de pedido:</strong> {new Date(pedido.fecha_de_pedido).toLocaleDateString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>ID Cliente:</strong> {pedido.cliente_id}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Importe:</strong> 
                      <input type="text" value={importe} onChange={handleImporteChange} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Estado:</strong>{' '}
                      <Badge variant={pedido.estado === 'Abierto' ? 'success' : 'danger'}>{pedido.estado}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Total facturado:</strong> {pedido.total_facturado}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Albaranes ID:</strong>
                      <ListGroup variant="flush">
                        {pedido.albaranes_id.map((albaranId) => (
                          <ListGroup.Item key={albaranId}>{albaranId}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Facturas ID:</strong>
                      <ListGroup variant="flush">
                        {pedido.facturas_id.map((facturaId) => (
                          <ListGroup.Item key={facturaId}>{facturaId}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </ListGroup.Item>
                  </ListGroup>
                  <button className="btn btn-primary" onClick={guardarCambios}>
                    Guardar
                  </button>
                  <Link to="/GestionPedidos" className="btn btn-primary">
                    Volver a la lista de pedidos
                  </Link>
                </>
              ) : (
                <p>No se encontró el pedido con el ID proporcionado.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetallePedido;
