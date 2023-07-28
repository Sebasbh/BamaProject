import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Header from '../../Components/Header/Header';

const URI = 'http://localhost:8000/facturas/';

function GestionFactura() {
  const [facturas, setFacturas] = useState([]);
  const [consulta, setConsulta] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [facturasPerPage] = useState(15);
  const [sortedField, setSortedField] = useState('');
  const [sortedOrder, setSortedOrder] = useState('asc');

  useEffect(() => {
    getFacturas();
  }, [consulta]);

  const getFacturas = async () => {
    try {
      const res = await axios.get(URI, {
        params: {
          consulta,
        }
      });
      setFacturas(res.data);
    } catch (error) {
      // Manejar el error de forma adecuada
    }
  };

  const handleInputChange = (e) => {
    setConsulta(e.target.value);
  };

  const buscarFacturas = async () => {
    try {
      const res = await axios.get(`${URI}?consulta=${consulta}`);
      setFacturas(res.data);
    } catch (error) {
      // Manejar el error de forma adecuada
    }
  };

  const sortFacturas = (field) => {
    const sortedFacturas = [...facturas].sort((a, b) => {
      if (a[field] < b[field]) return sortedOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortedOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFacturas(sortedFacturas);
    setSortedField(field);
    setSortedOrder(sortedField === field ? (sortedOrder === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  const filtrarFacturas = (factura) => {
    const { numero_de_factura, empresa, fecha_de_factura, vencimiento, total_facturado, estado } = factura;

    // Filtrar por numero_de_factura, empresa, fecha_de_factura, vencimiento, total_facturado, estado
    return (
      String(numero_de_factura).toLowerCase().includes(consulta.toLowerCase()) ||
      empresa?.toLowerCase().includes(consulta.toLowerCase()) ||
      String(fecha_de_factura).toLowerCase().includes(consulta.toLowerCase()) ||
      String(vencimiento).toLowerCase().includes(consulta.toLowerCase()) ||
      String(total_facturado).toLowerCase().includes(consulta.toLowerCase()) ||
      estado?.toLowerCase().includes(consulta.toLowerCase())
    );
  };

  const facturasFiltradas = facturas.filter(filtrarFacturas);

  const indexOfLastFactura = currentPage * facturasPerPage;
  const indexOfFirstFactura = indexOfLastFactura - facturasPerPage;
  const facturasPaginadas = facturasFiltradas.slice(indexOfFirstFactura, indexOfLastFactura);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Header />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Login</Breadcrumb.Item>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>Facturas</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md lg="4">
            <Form.Control
              className="me-auto"
              placeholder="Buscar factura ..."
              value={consulta}
              onChange={handleInputChange}
            />
          </Col>
      
          <Col lg="4"></Col>
          <Col xs lg="2">
            <Link to={`/CrearFactura`}>
              <Button variant="outline-success">Crear factura</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Table striped hover className="mt-5 text-center">
        <thead className="text-center">
          <tr>
            <th onClick={() => sortFacturas('numero_de_factura')}>
              <Button variant="warning">
                Nº factura {sortedField === 'numero_de_factura' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('empresa')}>
              <Button variant="danger">
                Empresa {sortedField === 'empresa' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('fecha_de_factura')}>
              <Button variant="info">
                Fecha factura{sortedField === 'fecha_de_factura' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('vencimiento')}>
              <Button variant="primary">
                Vencimiento {sortedField === 'vencimiento' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('base_imponible')}>
              <Button variant="warning">
                Base Imponible {sortedField === 'base_imponible' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('importe_IVA')}>
              <Button variant="danger">
                Importe IVA {sortedField === 'importe_IVA' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('total_factura')}>
              <Button variant="info">
               Total Factura {sortedField === 'total_factura' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th onClick={() => sortFacturas('estado')}>
              <Button variant="primary">
                Estado{sortedField === 'estado' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th>
              <Button variant="warning">Acciones</Button>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider text-center">
          {facturasPaginadas.map((factura, index) => (
            <tr key={index}>
              <td> {factura.numero_de_factura}</td>
              <td> {factura.empresa} </td>
              <td> {factura.fecha_de_factura} </td>
              <td> {factura.vencimiento} </td>
              <td> {factura.importe_IVA} </td>
              <td> {factura.base_imponible} </td>
              <td> {factura.total_factura} </td>
              <td>
                    {' '}
                    {factura.estado_factura ? (
                      <span style={{ color: 'green' }}>🟢En tramite</span>
                    ) : (
                      <span style={{ color: 'red' }}>🔴 cerrado</span>
                    )}
                  </td>
              <td>

                <Link to={`/DetalleFactura/${factura._id}`} className="btn btn-secondary">
                  Ver Detalles
                </Link>
              </td>

              
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="mt-3 justify-content-center">
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(Math.ceil(facturasFiltradas.length / facturasPerPage)).keys()].map((number) => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(facturasFiltradas.length / facturasPerPage)}
        />
      </Pagination>
    </Container>
  );
}

export default GestionFactura;
