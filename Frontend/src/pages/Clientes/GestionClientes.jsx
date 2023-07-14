import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/footer/Footer';

const URI = 'http://localhost:8000/clientes/';

function GestionClientes() {
  const [clientes, setClientes] = useState([]);
  const [consulta, setConsulta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(15);

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    const res = await axios.get(URI);
    setClientes(res.data);
  };

  const handleInputChange = (e) => {
    setConsulta(e.target.value);
  };

  const buscarClientes = async () => {
    const res = await axios.get(`${URI}?consulta=${consulta}`);
    setClientes(res.data);
  };

  const filtrarClientes = (cliente) => {
    const { empresa, CIF, forma_de_pago, activo } = cliente;

    // Filtrar por empresa, CIF y activo
    return (
      empresa?.toLowerCase().includes(consulta.toLowerCase()) ||
      CIF?.toLowerCase().includes(consulta.toLowerCase()) ||
      forma_de_pago?.toLowerCase().includes(consulta.toLowerCase()) ||
      String(activo)?.toLowerCase().includes(consulta.toLowerCase())
    );
  };

  const clientesFiltrados = clientes.filter(filtrarClientes);

  // Obtener los índices de los clientes actuales
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const clientesPaginados = clientesFiltrados.slice(indexOfFirstCliente, indexOfLastCliente);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container style={{ flex: 1 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Clientes</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
          <Row>
            <Col md lg="4">
              <Form.Control
                className="me-auto"
                placeholder="Buscar cliente ..."
                value={consulta}
                onChange={handleInputChange}
              />
            </Col>
            <Col md="auto">
              <Button variant="primary" onClick={buscarClientes}>
                Buscar
              </Button>
            </Col>
            <Col lg="4"></Col>
            <Col xs lg="2">
              <Link to={`/FormularioClientes`}>
                <Button variant="outline-success">Crear cliente</Button>
              </Link>
            </Col>
          </Row>
        </Container>

        <Table striped hover className="mt-5">
          <thead className="text-center">
            <tr>
              <th>Empresa</th>
              <th>CIF</th>
              <th>Forma de pago</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody className="table-group-divider text-center">
            {clientesPaginados.map((cliente, index) => (
              <tr key={index}>
                <td> {cliente.empresa}</td>
                <td> {cliente.CIF} </td>
                <td> {cliente.forma_de_pago} </td>
                <td>
                  {' '}
                  {cliente.activo ? (
                    <span style={{ color: 'green' }}>🟢</span>
                  ) : (
                    <span style={{ color: 'red' }}>🔴</span>
                  )}
                </td>
                <td>
                  <Link to={`/DetalleCliente/${cliente._id}`} className="btn btn-secondary">
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="mt-3 justify-content-center">
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(Math.ceil(clientesFiltrados.length / clientesPerPage)).keys()].map((number) => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(clientesFiltrados.length / clientesPerPage)}
          />
        </Pagination>
      </Container>
      <Footer />
    </div>
  );
}

export default GestionClientes;
