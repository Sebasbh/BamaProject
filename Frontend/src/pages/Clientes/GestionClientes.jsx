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
  const [sortedField, setSortedField] = useState('');
  const [sortedOrder, setSortedOrder] = useState('asc');

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
     console.error(error)
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

    const empresaMatches = empresa?.toLowerCase().includes(consulta.toLowerCase());
    const CIFMatches = CIF?.toLowerCase().includes(consulta.toLowerCase());
    const formaDePagoMatches = forma_de_pago?.toLowerCase().includes(consulta.toLowerCase());
    const activoMatches = activosFilter === 'all' || activo === (activosFilter === 'true');

    return empresaMatches || CIFMatches || formaDePagoMatches || activoMatches;
  };

  const filtrarClientesPorFormaPago = (cliente) => {
    if (formaPagoFilter === 'all') {
      return true; 
    }

    return cliente.forma_de_pago === formaPagoFilter;
  };

  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const clientesFiltrados = clientes.filter(filtrarClientes).filter(filtrarClientesPorFormaPago);
  const clientesPaginados = clientesFiltrados.slice(indexOfFirstCliente, indexOfLastCliente);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortClientes = (field) => {
    const sortedClientes = [...clientesFiltrados].sort((a, b) => {
      if (a[field] < b[field]) return sortedOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortedOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setClientes(sortedClientes);
    setSortedField(field);
    setSortedOrder(sortedField === field ? (sortedOrder === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  return (
    <>
    <Container>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <Container style={{ flex: 1 }}>
          <Breadcrumb>
            <Breadcrumb.Item href="/Home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Clientes</Breadcrumb.Item>
          </Breadcrumb>

          <Container>
            <Row className="align-items-center">
              <Col xs={12} lg={6} className="d-flex justify-content-around align-items-center mb-3">
                <div>
                  <Form.Label column style={{ marginTop: '30px' }}>Estado:</Form.Label>
                  <Form.Select onChange={handleActivosFilterChange} value={activosFilter} size="sm" style={{ width: '200px' }}>
                    <option value="all">Todos</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Label column style={{ marginTop: '30px' }}>Forma de Pago:</Form.Label>
                  <Form.Select onChange={handleFormaPagoFilterChange} value={formaPagoFilter} size="sm" style={{ width: '200px' }}>
                    <option value="all">Todas</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Confirming">Confirming</option>
                    <option value="Giro Bancario">Giro Bancario</option>
                  </Form.Select>
                </div>
              </Col>
              <Col xs={12} lg={6} className="d-flex justify-content-end align-items-center" style={{ marginTop: '20px' }}>
                <Link to={`/FormularioClientes`} className="ml-auto">
                  <Button variant="outline-success">Crear cliente</Button>
                </Link>
              </Col>
            </Row>
          </Container>

          <Table striped hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th onClick={() => sortClientes('empresa')}>
                  <Button variant="warning">
                    Empresa {sortedField === 'empresa' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortClientes('CIF')}>
                  <Button variant="danger">
                    CIF {sortedField === 'CIF' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortClientes('forma_de_pago')}>
                  <Button variant="info">
                    Forma de pago{sortedField === 'forma_de_pago' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortClientes('activo')}>
                  <Button variant="primary">
                    Estado {sortedField === 'activo' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th>
                  <Button variant="warning">Acciones</Button>
                </th>
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
      </div>
    </Container>
    </>
  );
}

export default GestionClientes;


