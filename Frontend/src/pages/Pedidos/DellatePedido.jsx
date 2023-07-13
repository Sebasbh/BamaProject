import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../Components/footer/Footer';

function DetallePedido() {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtiene el id del URL
  const { id } = useParams();

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pedidos/${id}`);
        setPedido(response.data.data);
        setLoading(false);
        console.log(response.data.data.cliente)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPedido();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del pedido...</p>;
  }

  return (
    <div>
      <h1>Detalle del Pedido</h1>
      {pedido ? (
        <div>
          <p>ID del Pedido: {pedido.numero}</p>
          <p>Fecha: {pedido.fecha}</p>
          <p>Cliente: {pedido.cliente}</p>
          <p>Importe: {pedido.importe}</p>
          <p>Estado: {pedido.estado}</p>
        </div>
      ) : (
        <p>No se encontró el pedido con el ID proporcionado.</p>
      )}
      <Footer/>
    </div>
  );
}

export default DetallePedido;



















/* import React from 'react'
import Header from '../../Components/Header/Header'
import { Container, Row, Col, Button, ListGroup, Breadcrumb } from 'react-bootstrap';

function DetallePedidos() {
    return (
        <>
            <Header />
            <Breadcrumb className="p-4">
                <Breadcrumb.Item href="http://localhost:3000/">Login</Breadcrumb.Item>
                <Breadcrumb.Item href="http://localhost:3000/Home">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>DetallePedidos</Breadcrumb.Item>
            </Breadcrumb>


            <Container className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
                <Row>
                    <Col>
                        <ListGroup horizontal className="align-items-center">
                            <ListGroup.Item className="d-flex align-items-center">
                                nombre_empresa = "Volkswagen"<br />
                                CIF = "A12345678"
                            </ListGroup.Item>
                            <div className="vertical-line-one"></div>
                            <ListGroup.Item className="d-flex align-items-center">
                                Importe de pedido:<br />
                                23454
                            </ListGroup.Item>
                            <div className="vertical-line-one"></div>
                            <ListGroup.Item className="d-flex align-items-center">
                                Numero de pedido:<br />
                                909340323
                            </ListGroup.Item>
                            <div className="vertical-line-one"></div>
                            <ListGroup.Item className="d-flex align-items-center">
                                Facturado:<br />
                                80%
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>

            <div className="d-flex justify-content-center my-3">
                <Button variant="success" className="botonCrear btn-sm" style={{ width: "150px", marginRight: "30px" }}> ➕ Crear Pedidos</Button>
                <Button variant="warning" className="botonEditar btn-sm" style={{ width: "150px", marginRight: "30px" }}>🖊️ Editar Pedidos</Button>
                <Button variant="danger" className="botonEliminar btn-sm" style={{ width: "150px" }}>🗑️ Eliminar Pedidos</Button>
            </div>
            <Container className="parent-container">
                <Row>
                    <Col className="left-container">
                        <h2 className="title">Facturas</h2>
                        <div className="block">
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>01</Col>
                                        <Col>23/06/2023</Col>
                                        <Col>Volkswagen</Col>
                                        <Col>2345 €</Col>
                                        <Col>💬</Col>
                                        <Col>🟢</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>02</Col>
                                        <Col>23/06/2023</Col>
                                        <Col>Volkswagen</Col>
                                        <Col>2345 €</Col>
                                        <Col>💬</Col>
                                        <Col>🟢</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>03</Col>
                                        <Col>23/06/2023</Col>
                                        <Col>Volkswagen</Col>
                                        <Col>2345 €</Col>
                                        <Col>💬</Col>
                                        <Col>🟢</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>04</Col>
                                        <Col>23/06/2023</Col>
                                        <Col>Volkswagen</Col>
                                        <Col>2345 €</Col>
                                        <Col>💬</Col>
                                        <Col>🔴</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>05</Col>
                                        <Col>23/06/2023</Col>
                                        <Col>Volkswagen</Col>
                                        <Col>2345 €</Col>
                                        <Col>💬</Col>
                                        <Col>🟢</Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>
                        </div>
                    </Col>
                    <Col xs={1} className="vertical-line"></Col>
                    <Col className="right-container">
                        <h2 className="title">Albaranes</h2>
                        <div className="albarans">
                            <ListGroup variant="flush">
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>01</Col>
                                            <Col>23/06/2023</Col>
                                            <Col>Volkswagen</Col>
                                            <Col>2345 €</Col>
                                            <Col>💬</Col>
                                            <Col>🟢</Col>

                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DetallePedidos */