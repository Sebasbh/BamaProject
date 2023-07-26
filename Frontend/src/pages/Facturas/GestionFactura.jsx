import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl, ListGroup, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlusSquare, EyeFill, Trash } from 'react-bootstrap-icons';


function GestionFactura() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    fetchFacturas();
  }, []);

  const fetchFacturas = async () => {
    const response = await axios.get('');
    setFacturas(response.data);
    console.log(response);
  };

  const eliminarFactura = async (FacturaId) => {
    try {
      await axios.delete(`${FacturaId}`);
      fetchFacturas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <Container fluid className="py-4">
      <Row>
        <Col lg={10} className="m-auto">
          <Card className="shadow">
            <Card.Header as="h2" className="text-center bg-primary text-white">Lista de Facturas</Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Buscar facturas"
                  aria-label="Buscar facturas"
                />
              </InputGroup>
              <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                  <tr>
                    <th>Nº factura</th>
                    <th>Fecha factura</th>
                    <th>ID Cliente</th>
                    <th>Importe</th>
                    <th>% facturado</th>
                    <th>Estado</th>
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
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/CrearFactura">
                <Button variant="primary" size="lg">
                  <PlusSquare className="mb-1" /> Nueva Factura
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default GestionFactura;