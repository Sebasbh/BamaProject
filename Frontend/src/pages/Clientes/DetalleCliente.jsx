import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';


function DetalleCliente() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); 
  const [updatedCliente, setUpdatedCliente] = useState(null); 

  const { id } = useParams();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/clientes/${id}`);
        setCliente(res.data);
        setLoading(false);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  const handleEliminarCliente = async () => {
    try {
      await axios.delete(`http://localhost:8000/clientes/${id}`);
      alert('Cliente eliminado exitosamente.');
      window.location.href = '/GestionClientes';
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarCliente = () => {
    setEditing(true);
    setUpdatedCliente({
      ...cliente,
    });
  };

  const handleGuardarCambios = async () => {
    try {
      await axios.put(`http://localhost:8000/clientes/${id}`, updatedCliente);
      alert('Cliente editado correctamente.');
      setEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedCliente({
      ...updatedCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleActivoChange = (e) => {
    setUpdatedCliente({
      ...updatedCliente,
      activo: e.target.checked,
    });
  };

  if (loading) {
    return <p>Cargando detalles del cliente...</p>;
  }

  return (
    <>
      <Container>
        <Header />
        <Breadcrumb style={{ marginLeft: '180px', marginTop: '50px' }}>
        <Breadcrumb.Item href="/Home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/GestionClientes">Clientes</Breadcrumb.Item>         
          <Breadcrumb.Item active>DetalleCliente</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
          <Container fluid>
            <Row className="align-items-center" style={{ height: '50vh' }}>
              <Col xs={12} md={3} className="d-flex flex-column align-items-center justify-content-center">
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.gaInIGLRaOjETjvVoAOtqgAAAA&pid=Api&P=0&h=180"
                  className="empresa"
                  alt="empresa"
                  style={{ width: '100px', height: 'auto', marginBottom: '20px', marginRight: '10px' }}
                />
              </Col>
              <Col xs={12} md={9}>
                <Container className="detalle-cliente">
                  <Row className="botonesArriba" style={{ marginTop: '50px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                      {!editing ? ( 
                        <>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                              variant="warning"
                              className="botonEditar"
                              size="sm"
                              style={{ width: '180px' }}
                              onClick={handleEditarCliente}
                            >
                              🖊️ Editar Cliente
                            </Button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                              variant="danger"
                              className="botonEliminar"
                              size="sm"
                              style={{ width: '180px' }}
                              onClick={handleEliminarCliente}
                            >
                              🗑️ Eliminar Cliente
                            </Button>
                          </div>
                        </>
                      ) : (
                    
                        <Button
                          variant="primary"
                          className="botonGuardarCambios"
                          size="sm"
                          style={{ width: '180px' }}
                          onClick={handleGuardarCambios}
                        >
                          💾 Guardar Cambios
                        </Button>
                      )}
                    </div>
                  </Row>

                  <Row>
                    <Col>
                      <div>
                        <h1>Detalle del cliente</h1>
                        {cliente ? (
                          <div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>Nombre empresa:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="text"
                                        name="empresa"
                                        value={updatedCliente.empresa}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      cliente.empresa 
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Direccion Social:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="text"
                                        name="direccion_social"
                                        value={updatedCliente.direccion_social}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      cliente.direccion_social
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>CIF:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="text"
                                        name="CIF"
                                        value={updatedCliente.CIF}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      cliente.CIF
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Forma de pago:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="text"
                                        name="forma_de_pago"
                                        value={updatedCliente.forma_de_pago}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      cliente.forma_de_pago
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>
                              Activo:{' '}
                              {editing ? (
                                <input
                                  type="checkbox"
                                  name="activo"
                                  checked={updatedCliente.activo}
                                  onChange={handleActivoChange}
                                />
                              ) : (
                                cliente.activo ? (
                                  <span style={{ color: 'green' }}>🟢</span>
                                ) : (
                                  <span style={{ color: 'red' }}>🔴</span>
                                )
                              )}
                            </p>

                          </div>
                        ) : (
                          <p>No se encontró el cliente con el ID proporcionado.</p>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row className="botonesAbajo">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                      <Button variant="primary" className="botonFacturas" size="sm" style={{ width: '120px' }}>
                        🧾 Facturas
                      </Button>
                      <Button variant="success" className="botonPedidos" size="sm" style={{ width: '120px' }}>
                        📋 Pedidos
                      </Button>
                    </div>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default DetalleCliente;
