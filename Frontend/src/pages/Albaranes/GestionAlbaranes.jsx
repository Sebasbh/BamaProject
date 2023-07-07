import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header'
import { Container, Row, Col, Button, ListGroup, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Filtro from '../../Components/Filtro/Filtro'


function GestionAlbaranes() {

    const [albaranes, setAlbaranes] = useState([]);
 

    useEffect(() => {
        // Llamada a la API al cargar el componente

        axios.get('http://localhost:8000/albaranes')

            .then(response => setAlbaranes(response.data))
            .catch(error => console.log(error));

    }, []);

    const deleteAlbaran = (id) => {
        // Eliminar el albarán con el ID proporcionado
        axios
            .delete(`http://localhost:8000/albaranes/${id}`)
            .then(response => {
                // Actualizar la lista de albaranes después de eliminar
                setAlbaranes(albaranes.filter(albaran => albaran._id !== id));
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <Header />

            <Breadcrumb className="p-4">
                <Breadcrumb.Item href="http://localhost:3000/">Login</Breadcrumb.Item>
                <Breadcrumb.Item href="http://localhost:3000/Home">
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>GestionAlbaranes</Breadcrumb.Item>
            </Breadcrumb>

          
          <Filtro />


            <div className="d-flex justify-content-end align-items-end">
                <Link to="/FormularioAlbaranes">
                    <Button variant="success" className="botonCrear btn-sm" style={{ width: "150px", margin: "40px" }}>➕ Crear Albaran</Button>
                </Link>
            </div>
            <br />

            <div className="d-flex justify-content-center my-3">
                <Button variant="warning" className="NºAlbaran btn-sm" style={{ width: "100px", marginRight: '80px' }}>NºAlbaran</Button>
                <Button variant="danger" className="Clientes btn-sm" style={{ width: "100px", marginRight: '80px' }} >Clientes 🔽</Button>
                <Button variant="info" className="Fecha btn-sm" style={{ width: "100px", marginRight: '80px' }} >Fecha 🔽</Button>
                <Button variant="primary" className="Importe btn-sm" style={{ width: "100px", marginRight: '80px' }} >Importe  🔽</Button>
                <Button variant="warning" className="Pedido btn-sm" style={{ width: "100px", marginRight: '80px' }}>Pedido</Button>
                <Button variant="danger" className="Facturado btn-sm" style={{ width: "100px", marginRight: '80px' }}>Facturado</Button>
                <Button variant="info" className="Firma btn-sm" style={{ width: "100px", marginRight: '80px' }}>Firma</Button>

            </div>
            <Container className="parent-container">
                <Row>
                    <Col className="container">

                        <div className="block">
                            <ListGroup variant="flush">
                                {albaranes.map(albaran => (
                                    <ListGroup.Item key={albaran._id}>
                                        <Row>
                                            <Col>{albaran.NºAlbaran}</Col>
                                            <Col>{albaran.cliente}</Col>
                                            <Col>{albaran.fecha}</Col>
                                            <Col>{albaran.importe}</Col>
                                            <Col>{albaran.pedido}</Col>
                                            <Col>{albaran.entregado ? "✔" : "✖"}</Col>
                                            <Col>{albaran.facturado ? "✅" : "❌"}</Col>

                                            <Link to={`/editar-albaran/${albaran._id}`}>
                                                <Link to="/FormularioAlbaranes">
                                                    <Button variant="warning" className="btn-sm" style={{ width: "40px", marginRight: "40px" }}>🖊️</Button>
                                                </Link>
                                            </Link>
                                            <Col>
                                                <Button
                                                    variant="danger"
                                                    className="btn-sm"
                                                    onClick={() => deleteAlbaran(albaran._id)}>🗑️</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default GestionAlbaranes