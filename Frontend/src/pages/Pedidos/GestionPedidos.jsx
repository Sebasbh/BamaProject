import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, InputGroup, FormControl, Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faEye, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

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
    <Container fluid className="py-4">
      <Row>
        <Col lg={10} className="m-auto">
          <Card className="shadow">
            <Card.Header as="h2" className="text-center" style={{ backgroundColor: '#343A40', color: 'white' }}>
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
                            {sortedField === 'numero_de_pedido' && (sortedOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />)}
                          </th>
                          <th onClick={() => handleSort('fecha_de_pedido')}>
                            Fecha pedido
                            {sortedField === 'fecha_de_pedido' && (sortedOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />)}
                          </th>
                          <th onClick={() => handleSort('empresa')}>
                            Empresa
                            {sortedField === 'empresa' && (sortedOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />)}
                          </th>
                          <th onClick={() => handleSort('importe')}>
                            Importe
                            {sortedField === 'importe' && (sortedOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />)}
                          </th>
                          <th>% facturado</th>
                          <th onClick={() => handleSort('estado')}>
                            Estado
                            {sortedField === 'estado' && (sortedOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />)}
                          </th>
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
                              <div>
                                <Link to={`/DetallePedido/${pedido._id}`} className="btn btn-info btn-sm">
                                  <FontAwesomeIcon icon={faEye} /> Ver más
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => eliminarPedido(pedido._id)}>
                                  <FontAwesomeIcon icon={faTrash} /> Eliminar
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
              <Link to="/CrearPedido" className="btn btn-success btn-lg">
                <FontAwesomeIcon icon={faPlusSquare} /> Nuevo Pedido
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionPedidos;
