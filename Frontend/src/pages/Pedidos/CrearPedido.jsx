import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CrearPedido = () => {
  const [numeroPedido, setNumeroPedido] = useState(null);
  const [cliente, setCliente] = useState('');
  const [importe, setImporte] = useState('');
  //const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    // Obtener el próximo número de pedido al montar el componente
    axios.get('http://localhost:8000/pedidos/next-number')
      .then(res => setNumeroPedido(res.data.nextPedidoNumber))
      .catch(err => console.error(err));
  }, []);

/*   const handleFileChange = e => {
    setArchivo(e.target.files[0]);
  }; */

  const handleSubmit = e => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('numero_de_pedido', numeroPedido);
    formData.append('cliente_id', cliente);
    formData.append('importe', importe);
 //   formData.append('archivo_adjunto', archivo);
    
    axios.post('http://localhost:8000/pedidos', formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNumeroPedido">
              <Form.Label>Número de pedido</Form.Label>
              <Form.Control type="text" readOnly value={numeroPedido || ''} />
            </Form.Group>

            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el ID del cliente" onChange={e => setCliente(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formImporte">
              <Form.Label>Importe</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el importe del pedido" onChange={e => setImporte(e.target.value)} />
            </Form.Group>

{/*             <Form.Group>
              <Form.File id="formArchivoAdjunto" label="Adjuntar archivo" onChange={handleFileChange} />
            </Form.Group> 
 */}
            <Button variant="primary" type="submit">
              Crear pedido
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPedido;
