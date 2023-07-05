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
    
    const res = await axios.get(URI)
    setCliente(res.data)
  }

  const breadcrumbItems = [
    { text: 'Inicio', link: '/Home' },
    { text: 'Cliente', link: '/categoria' },
  ];


  // procedimiento para eliminar un cliente
  //const deleteCliente = async (id) => {

     //axios.delete(`${URI}${id}`)
     //getCliente()
  //}

  return (
    //<div>GestionClientes</div>
    <div className='container'>
      <Breadcrumb>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            href={item.link}
            active={index === breadcrumbItems.length - 1}
          >
          {item.text}
          </Breadcrumb.Item>
          ))}
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

      <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Empresa</th>
          <th>CIF/NIF</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  
      <div className='row'>
          <table className='table  table-hover'>
            <thead>
              <tr>
                <th scope="col">Empresa</th>
                <th scope="col">CIF/NIF</th>
                <th scope="col">Forma de pago</th>
                <th scope="col">Fecha de creación</th>
              </tr>
            </thead>
            <tbody className='table-group-divider text-center'>
              { clientes.map ( (cliente, index) => (
                <tr key={ index }>
                  <td> { cliente.empresa }</td>
                  <td> { cliente.CIF_NIF} </td>
                  <td> { cliente.contacto} </td>
                  <td> { cliente.importe_pedido} </td>
                  <td> { cliente.fecha_pedido} </td>
                  <td> { cliente.forma_pago} </td>
                  <td>
                    <Link to={`/DectalleCliente/${cliente._id}`} className='btn btn-secondary'> Ver Detalles </Link>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
          
      </div>
      <div className="container">
      <div className="row">
      <Pagination>
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
        </div>
    </div>
  )
}


export default GestionClientes
