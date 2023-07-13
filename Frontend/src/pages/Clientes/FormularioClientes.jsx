import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const FormularioClientes = ({ cliente, setclientes }) => {
  const [empresa, setEmpresa] = useState('');
  const [direccion_social, setDireccionSocial] = useState('');
  const [CIF, setCIF] = useState('');
  const [fecha_creacion, setFechaCreacion] = useState('');
  const [activo, setActivo] = useState('');
  const [pedidos_id, setPedidosId] = useState('');
  const [forma_de_pago, setFormaPago] = useState('');

  useEffect(() => {
    // Realizar la solicitud GET para obtener los datos de un albarán existente
    axios
      .get('http://localhost:8000/clientes/{id}') // Reemplaza {id} con el ID del albarán que deseas editar
      .then(response => {
        const cliente = response.data;
        // Actualizar el estado con los datos del albarán obtenido
        setEmpresa(cliente.empresa);
        setDireccionSocial(cliente.direccion_social);
        setCIF(cliente.CIF);
        setFechaCreacion(cliente.fecha_creacion);
        setActivo(cliente.activo);
        setPedidosId(cliente.pedidos_id);
        setFormaPago(cliente.forma_de_pago);
      })
      .catch(error => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // Crear el objeto albarán a enviar
    const cliente = {
      empresa,
      direccion_social,
      CIF,
      fecha_creacion,
      activo,
      pedidos_id,
      forma_de_pago,
    };

    // Enviar la solicitud POST para crear/editar el albarán
    axios
      .post('http://localhost:8000/clientes', cliente)
      .then(response => {
        console.log(response.data);
        // Redireccionar a la página de gestión de clientes
        navigate('/Gestionclientes');
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Container className="parent-container">
        <h3 className="title">Formulario para crear los clientes</h3>
        <br /> <br />
        <Row>
          <Col className="left-container">
            <div className="block">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="empresa">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    value={empresa}
                    onChange={e => setEmpresa(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="direccion_social">
                  <Form.Label>Direccion Social</Form.Label>
                  <Form.Control
                    type="text"
                    value={direccion_social}
                    onChange={e => setDireccionSocial(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="CIF">
                  <Form.Label>CIF</Form.Label>
                  <Form.Control
                    type="text"
                    value={CIF}
                    onChange={e => setCIF(e.target.value)}
                  />

                <Form.Group controlId="activo">
                  <Form.Label>Activo</Form.Label>
                     <Form.Control
                        type="text"
                        value={activo}
                        onChange={e => setActivo(e.target.value)}
                        style={{ backgroundColor: 'white' }}
                      />
                     </Form.Group>
                </Form.Group>


              </Form>
            </div>
          </Col>
          <Col className="middle-container">
            <div className="block">
              <Form.Group controlId="pedidos_id">
                <Form.Label>Pedidos</Form.Label>
                <Form.Control
                  type="text"
                  value={pedidos_id}
                  onChange={e => setPedidosId(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="forma_de_pago">
                <Form.Label>Forma de pago</Form.Label>
                <Form.Control
                  type="text"
                  value={forma_de_pago}
                  onChange={e => setFormaPago(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="fecha_creacion">
                <Form.Label>Fecha de creación</Form.Label>
                <Form.Control
                  type="text"
                  value={fecha_creacion}
                  onChange={e => setFechaCreacion(e.target.value)}
                  style={{ backgroundColor: 'white' }}
                />
              </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '30px' }}>
                {cliente ? 'Editar Cliente' : 'Crear Cliente'}
            </Button>

              
            </div>
          </Col>
        
        </Row>
      </Container>
    </>
  );
};

export default FormularioClientes;
