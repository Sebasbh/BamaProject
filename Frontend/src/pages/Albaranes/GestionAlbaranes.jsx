import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { Container, Button, Breadcrumb, Table, Form, Col, Pagination, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function GestionAlbaranes() {
    const [albaran, setAlbaranes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [albaranesPerPage] = useState(10);
    const [consulta, setConsulta] = useState('');
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

    // Verificar si albaran es un array antes de filtrar
    const albaranesFiltrados = Array.isArray(albaran) ? albaran.filter(filtrarAlbaranes) : [];

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
                    <Row>
                        <Col md lg="4">
                            <Form.Control
                                className="me-auto"
                                placeholder="Buscar albaran ..."
                                value={consulta}
                                onChange={handleInputChange}
                            />
                        </Col>

                        <div className="d-flex justify-content-end align-items-end mt-3 mr-4">
                            <Link to="/FormularioAlbaranes">
                                <Button variant="outline-success">Crear albaran</Button>
                            </Link>
                        </div>
                    </Row>

                    <Table striped hover className="mt-5">
                        <thead className="text-center">
                            <tr>
                                <th><Button variant="warning">NºAlbaran</Button></th>
                                <th><Button variant="danger">Empresa</Button></th>
                                <th><Button variant="info">Fecha albaran</Button></th> 
                                <th><Button variant="primary">Importe</Button></th>
                                <th><Button variant="warning">NºPedido</Button></th>
                                <th><Button variant="danger">Estado</Button></th>
                            </tr>
                        </thead>

                        <tbody className="table-group-divider text-center">
                            {albaranesPaginados.map(albaran => (
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
                        {[...Array(Math.ceil(albaranesFiltrados.length / albaranesPerPage)).keys()].map(number => (
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
            </Container>
        </>
    );
}

export default GestionAlbaranes;
