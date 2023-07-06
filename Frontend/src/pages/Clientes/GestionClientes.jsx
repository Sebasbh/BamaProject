import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button  from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';




const URI = 'http://localhost:8000/clientes/'

function GestionClientes() {
  const [clientes, setCliente] = useState ([])
  useEffect ( ()=> {
    getCliente ()
  }, [])


  // procedimiento para mostrar todos los clientes
  const getCliente = async () => {
    const res = await axios.get(URI);
    setCliente(res.data);
    }
  };




  // procedimiento para eliminar un cliente
  //const deleteCliente = async (id) => {

     //axios.delete(`${URI}${id}`)
     //getCliente()
  //}

  return (
    //<div>GestionClientes</div>
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
      <Breadcrumb.Item active>Clientes</Breadcrumb.Item>
    </Breadcrumb>
      <Container>
        <Row>
          <Col md lg="4">
            <Form.Control className="me-auto" placeholder="Buscar cliente ..." /> 
          </Col>
          <Col md="auto">
            <Button variant="primary">Buscar</Button>
          </Col>
          <Col lg="4"></Col>
          <Col xs lg="2">
            <Button variant="outline-success">Crear cliente</Button>
          </Col>
        </Row>
      </Container>

      <Table striped hover className='mt-5'>
        <thead className='text-center'>
          <tr>
            <th>Empresa</th>
            <th>CIF/NIF</th>
            <th>Forma de pago</th>
              <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody className='table-group-divider text-center'>
              { clientes.map ( (cliente, index) => (
                <tr key={ index }>
                  <td> { cliente.empresa }</td>
                  <td> { cliente.CIF_NIF} </td>
                  <td> { cliente.forma_pago} </td>
                  <td> { cliente.fecha_creacion} </td>
                  <td>
                    <Link to={`/DectalleCliente/${cliente._id}`} className='btn btn-secondary'> Ver Detalles </Link>
                  </td>
                </tr>
              )) }
        </tbody>
      </Table>
          <Pagination>
              <Pagination.Prev />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Next />
            </Pagination>
         
      </Container>
  )
}


export default GestionClientes
