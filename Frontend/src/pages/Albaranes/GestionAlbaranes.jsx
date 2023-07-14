import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header'
import { Container, Button,Breadcrumb, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function GestionAlbaranes() {
    const [albaran, setAlbaran] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/albaranes')
            .then(response => setAlbaran(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Container>
                <Header />

                <Breadcrumb className="p-4">
                    <Breadcrumb.Item href="http://localhost:3000/">Login</Breadcrumb.Item>
                    <Breadcrumb.Item href="http://localhost:3000/Home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>GestionAlbaranes</Breadcrumb.Item>
                </Breadcrumb>

                <div className="d-flex justify-content-end align-items-end mt-3 mr-4">
                    <Link to="/FormularioAlbaranes">
                        <Button variant="outline-success">Crear albaran</Button>
                    </Link>
                </div>

                <Container>
                    <Table striped hover className='mt-5'>
                        <thead className='text-center'>
                            <tr>
                                <th><Button variant='warning'>NºAlbaran</Button></th>
                                <th><Button variant='danger'>Clientes</Button></th>
                                <th><Button variant='info'>Fecha</Button></th>
                                <th><Button variant='primary'>Importe</Button></th>
                                <th><Button variant='warning'>Pedido</Button></th>
                                <th><Button variant='danger'>Estado</Button></th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider text-center'>
                            {albaran.map(albaran => (
                                <tr key={albaran._id}>
                                    <td> {albaran.numero_de_albaran}</td>
                                    <td> {albaran.cliente_id}</td>
                                    <td> {albaran.fecha_albaran} </td>
                                    <td> {albaran.importe} </td>
                                    <td> {albaran.pedido_id} </td>
                                    <td> {albaran.estado} </td>

                                    <td>
                                        <Link to={`/DetalleAlbaranes/${albaran._id}`} className='info'>Ver Detalles</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </>
    );
}

export default GestionAlbaranes;
