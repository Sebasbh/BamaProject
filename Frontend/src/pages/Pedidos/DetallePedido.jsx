import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaSave, FaArrowLeft, FaEdit } from 'react-icons/fa'; 

// Define la instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Set the Authorization header with token from LocalStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

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

  const fetchPedidoAndClientes = useCallback(async () => {
    try {
      const pedidoResponse = await api.get(`/pedidos/${id}`);
      const clientesResponse = await api.get(`/clientes`);
      setPedido(pedidoResponse.data);
      setClientes(clientesResponse.data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchPedidoAndClientes();
  }, [fetchPedidoAndClientes]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pedidos/${id}`, pedido);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          <h1 className="mb-4">Detalle del Pedido</h1>
          <PedidoForm />
          <CardControls />
        </Col>
      </Row>
    </Container>
  );

  function PedidoForm() {
    return (
      <Card className="mb-5 border-0 shadow-lg">
        <Card.Header className="bg-success text-white">{`Pedido No: ${pedido.numero_de_pedido}`}</Card.Header>
        <Card.Body className="py-5">
          <Form onSubmit={handleEdit} className="mt-4">
            <PedidoFields />
          </Form>
        </Card.Body>
      </Card>
    );
  }

  function PedidoFields() {
    return (
      <>
        <FormField controlId="formNumeroDePedido" label="Número de Pedido" type="number" name="numero_de_pedido" value={pedido.numero_de_pedido} />
        <FormField controlId="formFechaDePedido" label="Fecha de Pedido" type="date" name="fecha_de_pedido" value={pedido.fecha_de_pedido} />
        <FormSelect controlId="formEmpresa" label="Empresa" name="empresa" value={pedido.empresa || ''} options={clientes.map(cliente => ({ value: cliente.empresa, text: cliente.empresa }))} />
        <FormField controlId="formImporte" label="Importe" type="number" name="importe" value={pedido.importe || 0} />
        <FormSelect controlId="formEstado" label="Estado" name="estado" value={pedido.estado || 'Abierto'} options={[{ value: 'Abierto', text: 'Abierto' }, { value: 'Cerrado', text: 'Cerrado' }]} />
        <FormField controlId="formTotalFacturado" label="Total Facturado" type="number" name="total_facturado" value={pedido.total_facturado || 0} />
        <FormField controlId="formArchivoAdjunto" label="Archivo Adjunto" type="text" name="archivo_adjunto" value={pedido.archivo_adjunto || ''} />
      </>
    );
  }

  function FormField({ controlId, label, type, name, value }) {
    return (
      <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} name={name} value={value} onChange={handleChange} readOnly={!editMode} />
      </Form.Group>
    );
  }

  function FormSelect({ controlId, label, name, value, options }) {
    return (
      <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="select" name={name} value={value} onChange={handleChange} readOnly={!editMode}>
          {options.map((option, index) => 
            <option key={index} value={option.value}>{option.text}</option>
          )}
        </Form.Control>
      </Form.Group>
    );
  }

  function CardControls() {
    return (
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
    );
  }
}

export default DetallePedido;
