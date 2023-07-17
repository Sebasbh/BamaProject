import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../../Components/Header/Header";

const URI = "http://localhost:8000/clientes/";

const CrearPedido = () => {
  const [numeroPedido, setNumeroPedido] = useState(null);
  const [cliente, setCliente] = useState("");
  const [importe, setImporte] = useState("");
  //const [archivo, setArchivo] = useState(null);

  useEffect(() => {
    // Obtener el próximo número de pedido al montar el componente
    axios
      .get("http://localhost:8000/pedidos/next-number")
      .then((res) => setNumeroPedido(res.data.nextPedidoNumber))
      .catch((err) => console.error(err));
    // Obtener la lista de clientes al montar el componente
    getClientes();
  }, []);

  /*   const handleFileChange = e => {
    setArchivo(e.target.files[0]);
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("numero_de_pedido", numeroPedido);
    formData.append("cliente_id", cliente);
    formData.append("importe", importe);
    //   formData.append('archivo_adjunto', archivo);

    axios
      .post("http://localhost:8000/pedidos", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  const [clientes, setClientes] = useState([]);
  const getClientes = async () => {
    const res = await axios.get(URI);
    setClientes(res.data);
  };

  return (
    <Container>
      <Header />
      <Container className="parent-container">
        <h3 className="title">Formulario para crear pedidos</h3>
        <br /> <br />
        <Col className="left-container"></Col>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNumeroPedido">
                <Form.Label>Número de pedido</Form.Label>
                <Form.Control type="text" readOnly value={numeroPedido || ""} />
              </Form.Group>

              <Form.Group controlId="formCliente">
                <Form.Label>Cliente</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                >
                  <option>Selecciona al cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.empresa}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formImporte">
                <Form.Label>Importe</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el importe del pedido"
                  onChange={(e) => setImporte(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Crear pedido
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CrearPedido;
