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

const URI = 'http://localhost:8000/clientes/';

function GestionClientes() {
  const [clientes, setClientes] = useState([]);
  const [consulta, setConsulta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(15);
  const [activosFilter, setActivosFilter] = useState('all');
  const [formaPagoFilter, setFormaPagoFilter] = useState('all');

  useEffect(() => {
    getClientes();
  }, [consulta, activosFilter, formaPagoFilter, currentPage]);

  const getClientes = async () => {
    try {
      const res = await axios.get(URI, {
        params: {
          consulta,
          formaPago: formaPagoFilter,
          activo: activosFilter
        }
      });
      setClientes(res.data);
    } catch (error) {
      // Manejar el error de forma adecuada
    }
  };
  

  const handleInputChange = (e) => {
    setConsulta(e.target.value);
  };

  const handleActivosFilterChange = (e) => {
    setActivosFilter(e.target.value);
  };

  const handleFormaPagoFilterChange = (e) => {
    setFormaPagoFilter(e.target.value);
  };
  const filtrarClientes = (cliente) => {
    const { empresa, CIF, forma_de_pago, activo } = cliente;
  
    // Filtrar por empresa, CIF y activo
    const empresaMatches = empresa?.toLowerCase().includes(consulta.toLowerCase());
    const CIFMatches = CIF?.toLowerCase().includes(consulta.toLowerCase());
    const formaDePagoMatches = forma_de_pago?.toLowerCase().includes(consulta.toLowerCase());
    const activoMatches = activosFilter === 'all' || activo === (activosFilter === 'true');

    return empresaMatches || CIFMatches || formaDePagoMatches || activoMatches;
  };
 

  const filtrarClientesPorFormaPago = (cliente) => {
    if (formaPagoFilter === 'all') {
      return true; // Mostrar todos si no hay filtro por forma de pago
    }

    return cliente.forma_de_pago === formaPagoFilter;
  };

  const clientesFiltrados = clientes.filter(filtrarClientes).filter(filtrarClientesPorFormaPago);

  // Obtener los índices de los clientes actuales
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const clientesPaginados = clientesFiltrados.slice(indexOfFirstCliente, indexOfLastCliente);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
        <Container>
        <Header />
      <Container style={{ flex: 1 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/Home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Clientes</Breadcrumb.Item>
        </Breadcrumb>
        <Container>

          <Row className="align-items-center">
            <Col xs={12} lg={6} className="mb-3">
              <Form.Label column style={{ marginTop: '30px' }}>Estado:</Form.Label>
              <Col>
                <Form.Select onChange={handleActivosFilterChange} value={activosFilter} size="sm" style={{ width: '200px' }}>
                  <option value="all">Todos</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </Form.Select>
              </Col>
              <Form.Label column style={{ marginTop: '20px' }}>Forma de Pago:</Form.Label>
              <Col>
                <Form.Select onChange={handleFormaPagoFilterChange} value={formaPagoFilter} size="sm" style={{ width: '200px' }}>
                  <option value="all">Todas</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Confirming">Confirming</option>
                  <option value="Giro Bancario">Giro Bancario</option>
                </Form.Select>
              </Col>
            </Col>
            <Col xs={12} lg={6} className="d-flex justify-content-end" style={{ marginTop: '20px' }}>
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
    
  );
}

export default GestionClientes;
