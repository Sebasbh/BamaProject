import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl, ListGroup, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlusSquare, EyeFill, Trash } from 'react-bootstrap-icons';
import Footer from '../../Components/footer/Footer';

function ListaPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    const response = await axios.get('http://localhost:8000/pedidos');
    setPedidos(response.data);
    console.log(response);
  };

  const eliminarPedido = async (pedidoId) => {
    try {
      await axios.delete(`http://localhost:8000/pedidos/${pedidoId}`);
      fetchPedidos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col lg={10} className="m-auto">
          <Card className="shadow">
            <Card.Header as="h2" className="text-center bg-primary text-white">Lista de Pedidos</Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar pedidos"
                  aria-label="Buscar pedidos"
                />
              </InputGroup>
              <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Nº pedido</th>
                    <th>Fecha pedido</th>
                    <th>ID Cliente</th>
                    <th>Importe</th>
                    <th>% facturado</th>
                    <th>Estado</th>
                    <th>Nº Facturas correspondientes</th>
                    <th>Nº Albaranes correspondientes</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido._id}>
                      <td>{pedido.numero_de_pedido}</td>
                      <td>{new Date(pedido.fecha_de_pedido).toLocaleDateString()}</td>
                      <td>{pedido.cliente_id}</td>
                      <td>{pedido.importe}</td>
                      <td>{(pedido.total_facturado / pedido.importe) * 100}%</td>
                      <td><Badge variant={pedido.estado === 'Enviado' ? 'success' : 'warning'}>{pedido.estado}</Badge></td>
                      <td>
                        <ListGroup variant="flush">
                          {pedido.facturas_id.map((factura) => (
                            <ListGroup.Item key={factura}>ID Factura: <Badge variant="info">{factura}</Badge></ListGroup.Item>
                          ))}
                        </ListGroup>
                      </td>
                      <td>
                        <ListGroup variant="flush">
                          {pedido.albaranes_id.map((albaran) => (
                            <ListGroup.Item key={albaran}>ID Albarán: <Badge variant="info">{albaran}</Badge></ListGroup.Item>
                          ))}
                        </ListGroup>
                      </td>
                      <td>
                        <div>
                          <Link to={`/DetallePedido/${pedido._id}`}>
                            <Button variant="primary" size="sm">
                              <EyeFill className="mb-1" /> Ver más
                            </Button>
                          </Link>
                          <Button variant="danger" size="sm" onClick={() => eliminarPedido(pedido._id)}>
                            <Trash className="mb-1" /> Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/CrearPedido">
                <Button variant="primary" size="lg">
                  <PlusSquare className="mb-1" /> Nuevo Pedido
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Footer/>
    </Container>
  );
}

export default ListaPedidos;
