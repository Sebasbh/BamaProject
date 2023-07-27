import React, { useEffect, useState, useCallback } from 'react';
import { Breadcrumb, Button, Container, Row, Col, Table, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';

const URI = 'http://localhost:8000/pedidos/';

function GestionPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [consulta, setConsulta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidosPerPage] = useState(15);
  const [sortedField, setSortedField] = useState(null);
  const [sortedOrder, setSortedOrder] = useState('asc');

  useEffect(() => {
    getPedidos();
  }, []);

  const getPedidos = async () => {
    const res = await axios.get(URI);
    setPedidos(res.data);
  };

  const handleInputChange = (e) => {
    setConsulta(e.target.value);
  };

  const buscarPedidos = async () => {
    const res = await axios.get(`${URI}?consulta=${consulta}`);
    setPedidos(res.data);
  };

  const filtrarPedidos = (pedido) => {
    const { numero_de_pedido, fecha_de_pedido, empresa, importe, estado } = pedido;
  
    return (
      numero_de_pedido?.toString().toLowerCase().includes(consulta.toLowerCase()) ||
      fecha_de_pedido?.toLowerCase().includes(consulta.toLowerCase()) ||
      empresa?.toLowerCase().includes(consulta.toLowerCase()) ||
      String(importe)?.toLowerCase().includes(consulta.toLowerCase()) ||
      estado?.toLowerCase().includes(consulta.toLowerCase())
    );
  };

  const pedidosFiltrados = pedidos.filter(filtrarPedidos);

  const sortPedidos = (field) => {
    const sortedPedidos = [...pedidosFiltrados].sort((a, b) => {
      if (a[field] < b[field]) return sortedOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortedOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setPedidos(sortedPedidos);
    setSortedField(field);
    setSortedOrder(sortedField === field ? (sortedOrder === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  const indexOfLastPedido = currentPage * pedidosPerPage;
  const indexOfFirstPedido = indexOfLastPedido - pedidosPerPage;
  const pedidosPaginados = pedidosFiltrados.slice(indexOfFirstPedido, indexOfLastPedido);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Header />
      <Container style={{ flex: 1 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Login</Breadcrumb.Item>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Pedidos</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md lg="4">
            <Form.Control
              className="me-auto"
              placeholder="Buscar pedido ..."
              value={consulta}
              onChange={handleInputChange}
            />
          </Col>
          <Col md="auto">
            <Button variant="primary" onClick={buscarPedidos}>
              Buscar
            </Button>
          </Col>
          <Col lg="4"></Col>
          <Col xs lg="2">
            <Link to={`/CrearPedido`}>
              <Button variant="outline-success">Crear Pedido</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Table striped hover className="mt-5">
        <thead className="text-center">
          <tr>
         
            <th onClick={() => sortPedidos('numero_de_pedido')}><Button variant="warning">
              Nº pedido {sortedField === 'numero_de_pedido' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button></th>
            <th onClick={() => sortPedidos('fecha_de_pedido')}><Button variant="danger">
              Fecha pedido {sortedField === 'fecha_de_pedido' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button></th>
            <th onClick={() => sortPedidos('empresa')}><Button variant="info">
              Empresa {sortedField === 'empresa' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button> </th>
            <th onClick={() => sortPedidos('importe')}><Button variant="info">
              Importe {sortedField === 'importe' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button></th>
            <th onClick={() => sortPedidos('estado')}><Button variant="warning">
              Estado {sortedField === 'estado' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button></th>
            <th><Button variant="danger">Acciones</Button></th>
          </tr>
        </thead>
        <tbody className="table-group-divider text-center">
          {pedidosPaginados.map((pedido, index) => (
            <tr key={index}>
              <td>{pedido.numero_de_pedido}</td>
              <td>{pedido.fecha_de_pedido}</td>
              <td>{pedido.empresa}</td>
              <td>{pedido.importe}</td>
              <td>{pedido.estado}</td>
              <td>
                <Link to={`/DetallePedido/${pedido._id}`} className="btn btn-secondary">
                  Ver Detalles
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(Math.ceil(pedidosFiltrados.length / pedidosPerPage)).keys()].map((number) => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(pedidosFiltrados.length / pedidosPerPage)}
        />
      </Pagination>
    </Container>
  );
}

export default GestionPedidos;
