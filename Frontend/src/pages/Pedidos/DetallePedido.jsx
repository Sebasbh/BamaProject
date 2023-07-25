import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaSave, FaArrowLeft, FaEdit } from 'react-icons/fa'; 

function DetallePedido() {
  let { id } = useParams();
  const [pedido, setPedido] = useState({
    numero_de_pedido: 0,
    fecha_de_pedido: '',
    empresa: '',
    importe: 0,
    archivo_adjunto: '',
    estado: '',
    total_facturado: 0,
    albaranes_id: [],
    facturas_id: []
  });
  const [editMode, setEditMode] = useState(false);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/pedidos/${id}`)
      .then(res => {
        const pedidoData = res.data;
        setPedido(pedidoData);
      })
      .catch(err => console.log(err));

    axios.get(`http://localhost:8000/clientes`)
      .then(res => {
        const clientesData = res.data;
        setClientes(clientesData);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/pedidos/${id}`, pedido)
      .then(res => {
        setEditMode(false);
      })
      .catch(err => console.log(err));
  }

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <h1 className="mb-4">Detalle del Pedido</h1>
          <Card className="mb-5 border-0 shadow-lg">
            <Card.Header className="bg-success text-white">{`Pedido No: ${pedido.numero_de_pedido}`}</Card.Header>
            <Card.Body className="py-5">
              <Form onSubmit={handleEdit} className="mt-4">
                <Form.Group controlId="formNumeroDePedido">
                  <Form.Label>Número de Pedido</Form.Label>
                  <Form.Control type="number" name="numero_de_pedido" value={pedido.numero_de_pedido} onChange={handleChange} readOnly={!editMode} />
                </Form.Group>
                <Form.Group controlId="formFechaDePedido">
                  <Form.Label>Fecha de Pedido</Form.Label>
                  <Form.Control type="date" name="fecha_de_pedido" value={pedido.fecha_de_pedido} onChange={handleChange} readOnly={!editMode} />
                </Form.Group>
                <Form.Group controlId="formEmpresa">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control as="select" name="empresa" value={pedido.empresa || ''} onChange={handleChange} readOnly={!editMode}>
                    {clientes.map((cliente) =>
                      <option key={cliente._id} value={cliente.empresa}>{cliente.empresa}</option>
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formImporte">
                  <Form.Label>Importe</Form.Label>
                  <Form.Control type="number" name="importe" value={pedido.importe || 0} onChange={handleChange} readOnly={!editMode} />
                </Form.Group>
                <Form.Group controlId="formEstado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control as="select" name="estado" value={pedido.estado || 'Abierto'} onChange={handleChange} readOnly={!editMode}>
                    <option>Abierto</option>
                    <option>Cerrado</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formTotalFacturado">
                  <Form.Label>Total Facturado</Form.Label>
                  <Form.Control type="number" name="total_facturado" value={pedido.total_facturado || 0} onChange={handleChange} readOnly={!editMode} />
                </Form.Group>
                <Form.Group controlId="formArchivoAdjunto">
                  <Form.Label>Archivo Adjunto</Form.Label>
                  <Form.Control type="text" name="archivo_adjunto" value={pedido.archivo_adjunto || ''} onChange={handleChange} readOnly={!editMode} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="my-5 border-0 shadow-lg">
            <Card.Body className="py-5 d-flex justify-content-between">
              <Link to="/GestionPedidos">
                <Button variant="info" className="me-2">
                  <FaArrowLeft /> Ir a gestión de pedidos
                </Button>
              </Link>
              <Button variant="danger" onClick={() => setEditMode(!editMode)}>
                {editMode ? <><FaSave /> Guardar Cambios</> : <><FaEdit /> Editar Pedido</>}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DetallePedido;
