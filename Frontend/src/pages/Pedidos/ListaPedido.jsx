import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PedidoList() {
  const [pedidos, setPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = () => {
    axios
      .get('http://localhost:8000/pedidos')
      .then(res => {
        setPedidos(res.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deletePedido = (id) => {
    axios
      .delete(`http://localhost:8000/pedidos/${id}`)
      .then(res => {
        fetchPedidos();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const calculatePorcentajeFacturado = (pedido) => {
    if (pedido.facturas && Array.isArray(pedido.facturas) && pedido.facturas.length > 0) {
      const totalFacturado = pedido.facturas.reduce((total, factura) => total + factura.importe, 0);
      return (totalFacturado / pedido.importe) * 100;
    }
    return 0;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortBy(`${field}-desc`);
    } else {
      setSortBy(field);
    }
  };

  const filteredPedidos = pedidos.filter(pedido =>
    (pedido.numero && pedido.numero.toString().includes(searchTerm)) ||
    (pedido.cliente && pedido.cliente.includes(searchTerm))
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h2>Listado de Pedidos</h2>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
              <Link to="/CrearPedido" className="btn btn-primary mb-3">
                Crear Pedido
              </Link>
              <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                  <tr>
                    <th onClick={() => handleSort('numero')}>Número</th>
                    <th onClick={() => handleSort('fecha')}>Fecha</th>
                    <th onClick={() => handleSort('cliente')}>Cliente</th>
                    <th onClick={() => handleSort('importe')}>Importe</th>
                    <th>Porcentaje Facturado</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPedidos.map(pedido => (
                    <tr key={pedido._id}>
                      <td>{pedido.numero}</td>
                      <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                      <td>{pedido.cliente}</td>
                      <td>{pedido.importe.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
                      <td>{calculatePorcentajeFacturado(pedido)}%</td>
                      <td>{pedido.estado}</td>
                      <td>
                        <Button variant="danger" onClick={() => deletePedido(pedido._id)}>
                          Eliminar
                        </Button>
                        <Link to={`/detallePedido/${pedido._id}`} className="btn btn-primary ml-2">
                            Detalle
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PedidoList;
