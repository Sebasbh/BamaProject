import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { Container, Button, Breadcrumb, Table, Form, Col, Pagination, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function GestionAlbaranes() {
  const [albaranes, setAlbaranes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [albaranesPerPage] = useState(10);
  const [consulta, setConsulta] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [sortedOrder, setSortedOrder] = useState('asc');

  const URI = 'http://localhost:8000/albaranes/';

  useEffect(() => {
    getAlbaranes();
  }, []);

  const getAlbaranes = async () => {
    const res = await axios.get(URI);
    setAlbaranes(res.data);
  };

  const handleInputChange = (e) => {
    setConsulta(e.target.value);
  };

  const buscarAlbaranes = async () => {
    const res = await axios.get(`${URI}?consulta=${consulta}`);
    setAlbaranes(res.data);
  };

  const filtrarAlbaranes = (albaran) => {
    const { empresa, importe, fecha_albaran, numero_de_albaran } = albaran;

    // Filtrar por cliente_id, Importe y fecha_albaran
    return (
      empresa?.toLowerCase().includes(consulta.toLowerCase()) ||
      (importe && String(importe).toLowerCase().includes(consulta.toLowerCase())) ||
      (fecha_albaran && String(fecha_albaran).toLowerCase().includes(consulta.toLowerCase())) ||
      (numero_de_albaran && String(numero_de_albaran).toLowerCase().includes(consulta.toLowerCase()))
    );
  };

  const sortAlbaranes = (field) => {
    const sortedAlbaranes = [...albaranes].sort((a, b) => {
      if (a[field] < b[field]) return sortedOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortedOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setAlbaranes(sortedAlbaranes);
    setSortedField(field);
    setSortedOrder(sortedField === field ? (sortedOrder === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  // Verificar si albaran es un array antes de filtrar
  const albaranesFiltrados = Array.isArray(albaranes) ? albaranes.filter(filtrarAlbaranes) : [];

  // Obtener los índices de los albaranes actuales
  const indexOfLastAlbaran = currentPage * albaranesPerPage;
  const indexOfFirstAlbaran = indexOfLastAlbaran - albaranesPerPage;
  const albaranesPaginados = albaranesFiltrados.slice(indexOfFirstAlbaran, indexOfLastAlbaran);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container>
        <Header />

        <Breadcrumb className="p-4">
          <Breadcrumb.Item href="/">Login</Breadcrumb.Item>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>GestionAlbaranes</Breadcrumb.Item>
        </Breadcrumb>

        <Container>
        <Row className="align-items-center">
              <Col xs={12} lg={6} className="d-flex justify-content-around align-items-center mb-3">
                
              <Form.Control
                className="me-auto"
                placeholder="Buscar albaran ..."
                value={consulta}
                onChange={handleInputChange}
              />
            </Col>
          
            <Col xs={12} lg={6} className="d-flex justify-content-end align-items-end mb-3">
              <Link to="/FormularioAlbaranes">
                <Button variant="outline-success">Crear albaran</Button>
              </Link>
            </Col>
          </Row>
          </Container>

          <Table striped hover className="mt-5">
            <thead className="text-center">
              <tr>
                <th onClick={() => sortAlbaranes('numero_de_albaran')}>
                  <Button variant="warning">
                    Nº albaran {sortedField === 'numero_de_albaran' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortAlbaranes('empresa')}>
                  <Button variant="danger">
                    Empresa {sortedField === 'empresa' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortAlbaranes('fecha_albaran')}>
                  <Button variant="info">
                    Fecha albaran {sortedField === 'fecha_albaran' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortAlbaranes('importe')}>
                  <Button variant="primary">
                    Importe {sortedField === 'importe' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortAlbaranes('numero_de_pedido')}>
                  <Button variant="warning">
                    Nº pedido {sortedField === 'numero_de_pedido' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th onClick={() => sortAlbaranes('estado')}>
                  <Button variant="danger">
                    Estado {sortedField === 'estado' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
                  </Button>
                </th>
                <th>
                  <Button variant="info">Acciones</Button>
                </th>
              </tr>
            </thead>

            <tbody className="table-group-divider text-center">
              {albaranesPaginados.map((albaran) => (
                <tr key={albaran._id}>
                  <td>{albaran.numero_de_albaran}</td>
                  <td>{albaran.empresa}</td>
                  <td>{albaran.fecha_albaran}</td>
                  <td>{albaran.importe}</td>
                  <td>{albaran.numero_de_pedido}</td>
                  <td>{albaran.estado}</td>

                  <td>
                    <Link to={`/DetalleAlbaranes/${albaran._id}`} className="btn btn-secondary">
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="mt-3 justify-content-center">
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(Math.ceil(albaranesFiltrados.length / albaranesPerPage)).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(albaranesFiltrados.length / albaranesPerPage)}
            />
          </Pagination>
        
      </Container>
    </>
  );
}

export default GestionAlbaranes;
