import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, InputGroup, FormControl, Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faEye, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

function GestionPedidos() {
  // State initialization
  const [pedidos, setPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [sortedOrder, setSortedOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  // Functions definition
  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/pedidos', {
        params: {
          search: searchQuery,
          sortBy: sortedField,
          sortOrder: sortedOrder
        }
      });
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortedField, sortedOrder]);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const eliminarPedido = async (pedidoId) => {
    try {
      await api.delete(`/pedidos/${pedidoId}`);
      fetchPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    setSortedField(field);
    setSortedOrder(sortedField === field ? (sortedOrder === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  // Component rendering
  return (
    <Container fluid className="py-4">
        <nav className="miga-de-pan">
          <a href="/">Inicio de sesión </a> &raquo;
          <a href="/Home"> Inicio</a> &raquo;
          <a href="/GestionPedidos"> Gestión de Pedidos</a>
        </nav>
      <Row>
        <Col lg={10} className="m-auto">
          <Card className="shadow">
            <Card.Header as="h2" className="d-flex align-items-center justify-content-between" style={{ backgroundColor: '#343A40', color: 'white' }}>
              Lista de Pedidos
              <Link to="/CrearPedido" className="btn btn-success btn-lg">
                <FontAwesomeIcon icon={faPlusSquare} /> Nuevo Pedido
              </Link>
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
              {loading ? <Spinner animation="border" className="mt-5" /> : <PedidosTable />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  // Sub components
  function PedidosTable() {
    if (pedidos.length === 0) {
      return <p>No se encontraron pedidos que coincidan con la búsqueda.</p>;
    }
    return (
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort('numero_de_pedido')}>Nº pedido{sortIcon('numero_de_pedido')}</th>
            <th onClick={() => handleSort('fecha_de_pedido')}>Fecha pedido{sortIcon('fecha_de_pedido')}</th>
            <th onClick={() => handleSort('empresa')}>Empresa{sortIcon('empresa')}</th>
            <th onClick={() => handleSort('importe')}>Importe{sortIcon('importe')}</th>
            <th>% facturado</th>
            <th onClick={() => handleSort('estado')}>Estado{sortIcon('estado')}</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => <PedidoRow key={pedido._id} pedido={pedido} />)}
        </tbody>
      </Table>
    );
  }

  function PedidoRow({ pedido }) {
    return (
      <tr>
        <td>{pedido.numero_de_pedido}</td>
        <td>{new Date(pedido.fecha_de_pedido).toLocaleDateString()}</td>
        <td>{pedido.empresa}</td>
        <td>{pedido.importe}</td>
        <td>{((pedido.total_facturado / pedido.importe) * 100).toFixed(2)}%</td>
        <td><Badge variant={pedido.estado === 'Enviado' ? 'success' : 'danger'}>{pedido.estado}</Badge></td>
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
    );
  }

  function sortIcon(field) {
    if (sortedField === field) {
      return sortedOrder === 'asc' ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />;
    }
    return null;
  }
}

export default GestionPedidos;
