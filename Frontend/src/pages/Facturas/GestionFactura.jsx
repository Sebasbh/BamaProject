import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl, ListGroup, Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlusSquare, EyeFill, Trash } from 'react-bootstrap-icons';
import Footer from '../../Components/footer/Footer';

function GestionFactura() {
  const [facturas, setFacturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si los datos se están cargando
  const [error, setError] = useState(null);
  
  const fetchFacturas = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/facturas');
      setFacturas(response.data);
      setIsLoading(false); // Actualizar el estado de isLoading cuando los datos se hayan cargado
    } catch (error) {
      console.error(error);
      setIsLoading(false); // En caso de error, también debes actualizar el estado de isLoading
    }
  }, [setFacturas]);

  useEffect(() => {
    fetchFacturas();
  }, [fetchFacturas]);

  const eliminarFactura = async (FacturaId) => {
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

    <div>
      <Container fluid className="py-4">
        <Row>
          <Col lg={10} className="m-auto">
            <div>
              <div className="card-header text-center bg-primary text-white">
                <h2>Lista de Facturas</h2>
              </div>
              <div className="card-body">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Buscar facturas"
                    aria-label="Buscar facturas"
                  />
                </InputGroup>
                {isLoading ? (
                  <p>Cargando facturas...</p>
                ) : error ? (
                  <p>Error al cargar las facturas. Inténtalo de nuevo más tarde.</p>
                ) : (
                  <Table striped bordered hover responsive className="shadow-sm">
                    <thead className="thead-dark">
                      <tr>
                        <th>Nº factura</th>
                        <th>Fecha factura</th>
                        <th>ID Cliente</th>
                        <th>Importe</th>
                        <th>% facturado</th>
                        <th>Estado de la factura</th>
                        <th>Nº Albaranes correspondientes</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facturas.map((factura) => (
                        <tr key={factura._id}>
                          <td>{factura.numero_de_factura}</td>
                          <td>{new Date(factura.fecha_de_factura).toLocaleDateString()}</td>
                          <td>{factura.cliente_id}</td>
                          <td>{factura.importe}</td>
                          <td>{(factura.total_facturado / factura.importe) * 100}%</td>
                          <td><Badge variant={factura.estado === 'Enviado' ? 'success' : 'warning'}>{factura.estado}</Badge></td>
                          <td>
                            <ListGroup variant="flush">
                              {factura.facturas_id.map((factura) => (
                                <ListGroup.Item key={factura}>ID Factura: <Badge variant="info">{factura}</Badge></ListGroup.Item>
                              ))}
                            </ListGroup>
                          </td>
                          <td>
                            <ListGroup variant="flush">
                              {factura.albaranes_id.map((albaran) => (
                                <ListGroup.Item key={albaran}>ID Albarán: <Badge variant="info">{albaran}</Badge></ListGroup.Item>
                              ))}
                            </ListGroup>
                          </td>
                          <td>
                            <div>
                              <Link to={`/DetalleFactura/${factura._id}`}>
                                <Button variant="primary" size="sm">
                                  <EyeFill className="mb-1" /> Ver más
                                </Button>
                              </Link>
                              <Button variant="danger" size="sm" onClick={() => eliminarFactura(factura._id)}>
                                <Trash className="mb-1" /> Eliminar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </div>
              <div className="card-footer text-center">
                <Link to="/CrearFactura">
                  <Button variant="primary" size="lg">
                    <PlusSquare className="mb-1" /> Nueva Factura
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
=======
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
          <Col md="auto">
            <Button variant="primary" onClick={buscarFacturas}>
              Buscar
            </Button>
          </Col>
          <Col lg="4"></Col>
          <Col xs lg="2">
            <Link to={`/FormularioFacturas`}>
              <Button variant="outline-success">Crear factura</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Table striped hover className="mt-5">
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
            <th onClick={() => sortFacturas('estado')}>
              <Button variant="warning">
                Estado{sortedField === 'estado' ? (sortedOrder === 'asc' ? '▲' : '▼') : ''}
              </Button>
            </th>
            <th>
              <Button variant="danger">Acciones</Button>
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
              <td> {factura.estado} </td>
              <td>
                <Link to={`/DetalleFactura`} className="btn btn-secondary">
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