import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, InputGroup, FormControl, ListGroup, Container, Row, Col, Card, Badge, Spinner, Breadcrumb} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusSquare, EyeFill, Trash, ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import Header from '../../Components/Header/Header';

function GestionPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [sortedOrder, setSortedOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/pedidos', {
        params: {
          search: searchQuery,
          sortBy: sortedField,
          sortOrder: sortedOrder
        }
      });
      setPedidos(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortedField, sortedOrder]);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const eliminarPedido = async (pedidoId) => {
    try {
      await axios.delete(`http://localhost:8000/pedidos/${pedidoId}`);
      fetchPedidos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortedOrder(sortedOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedField(field);
      setSortedOrder('asc');
    }
  };

  return (
    <Container>
      <Header/>
      <Container>
        <Breadcrumb>
            <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Pedidos</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Row>
        <Col lg={10} className="m-auto">
          <Card className="shadow">
            <Card.Header as="h2" className="text-center bg-primary text-white">
              Lista de Pedidos
            </Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar pedidos"
                  aria-label="Buscar pedidos"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </InputGroup>
              {loading ? (
                <Spinner animation="border" className="mt-5" />
              ) : (
                <>
                  {pedidos.length > 0 ? (
                    <Table striped bordered hover responsive className="shadow-sm">
                      <thead className="thead-dark">
                        <tr>
                          <th onClick={() => handleSort('numero_de_pedido')}>
                            Nº pedido
                            {sortedField === 'numero_de_pedido' && (sortedOrder === 'asc' ? <ArrowUp /> : <ArrowDown />)}
                          </th>
                          <th onClick={() => handleSort('fecha_de_pedido')}>
                            Fecha pedido
                            {sortedField === 'fecha_de_pedido' && (sortedOrder === 'asc' ? <ArrowUp /> : <ArrowDown />)}
                          </th>
                          <th onClick={() => handleSort('empresa')}>
                            Empresa
                            {sortedField === 'empresa' && (sortedOrder === 'asc' ? <ArrowUp /> : <ArrowDown />)}
                          </th>
                          <th onClick={() => handleSort('importe')}>
                            Importe
                            {sortedField === 'importe' && (sortedOrder === 'asc' ? <ArrowUp /> : <ArrowDown />)}
                          </th>
                          <th>% facturado</th>
                          <th onClick={() => handleSort('estado')}>
                            Estado
                            {sortedField === 'estado' && (sortedOrder === 'asc' ? <ArrowUp /> : <ArrowDown />)}
                          </th>
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
                            <td>{pedido.empresa}</td>
                            <td>{pedido.importe}</td>
                            <td>{((pedido.total_facturado / pedido.importe) * 100).toFixed(2)}%</td>
                            <td>
                              <Badge variant={pedido.estado === 'Enviado' ? 'success' : 'warning'}>
                                {pedido.estado}
                              </Badge>
                            </td>
                            <td>
                              <ListGroup variant="flush">
                                {pedido.facturas_id.map((factura) => (
                                  <ListGroup.Item key={factura}>
                                    ID Factura: <Badge variant="info">{factura}</Badge>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </td>
                            <td>
                              <ListGroup variant="flush">
                                {pedido.albaranes_id.map((albaran) => (
                                  <ListGroup.Item key={albaran}>
                                    ID Albarán: <Badge variant="info">{albaran}</Badge>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </td>
                            <td>
                              <div>
                                <Link to={`/DetallePedido/${pedido._id}`} className="btn btn-primary btn-sm">
                                  <EyeFill className="mb-1" /> Ver más
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
                  ) : (
                    <p>No se encontraron pedidos que coincidan con la búsqueda.</p>
                  )}
                </>
              )}
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/CrearPedido" className="btn btn-primary btn-lg">
                <PlusSquare className="mb-1" /> Nuevo Pedido
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionPedidos;