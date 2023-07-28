import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Breadcrumb } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';

function DetalleFacturas() {
  const [factura, setFactura] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedFactura, setUpdatedFactura] = useState(null);
  const [archivo, setArchivo] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/facturas/${id}`);
        setFactura(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchClientes = async () => {
      try {
        const res = await axios.get('http://localhost:8000/clientes');
        setClientes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFactura();
    fetchClientes();
  }, [id]);

  const handleEliminarFactura = async () => {
    try {
      await axios.delete(`http://localhost:8000/facturas/${id}`);
      alert('Factura eliminada exitosamente.');
      window.location.href = '/GestionFacturas';
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarFactura = () => {
    setEditing(true);
    setUpdatedFactura({
      ...factura,
    });
  };

  const handleGuardarCambios = async () => {
    try {
      await axios.put(`http://localhost:8000/facturas/${id}`, updatedFactura);
      alert('Factura editada correctamente.');
      setEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedFactura({
      ...updatedFactura,
      [e.target.name]: e.target.value,
    });
  };

  const handleClienteChange = (e) => {
    const selectedCliente = clientes.find((cliente) => cliente.id === e.target.value);
    setUpdatedFactura({
      ...updatedFactura,
      cliente: selectedCliente.nombre,
      cif_cliente: selectedCliente.cif,
    });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  if (loading) {
    return <p>Cargando detalles de la factura...</p>;
  }

  return (
    <>
      <Container>
        <Header/>
        <Breadcrumb style={{ marginLeft: '180px', marginTop: '50px' }}>
          <Breadcrumb.Item href="http://localhost:3000/gestionfacturas">GestiónFacturas</Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/Home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>DetalleFacturas</Breadcrumb.Item>
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
                <Container className="detalle-factura">
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
                              onClick={handleEditarFactura}
                            >
                              🖊️ Editar Factura
                            </Button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button
                              variant="danger"
                              className="botonEliminar"
                              size="sm"
                              style={{ width: '180px' }}
                              onClick={handleEliminarFactura}
                            >
                              🗑️ Eliminar Factura
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
                  <Row style={{ marginTop: '100px', marginBottom: '50px' }}>
                    <Col>
                      <div className="factura-info">
                        {factura ? (
                          <div>
                            <h3>Detalle de la Factura</h3>
                            <table>
                              <tbody>
                                <tr>
                                  <td>Nº de Factura:</td>
                                  <td>{factura.numero_de_factura}</td>
                                </tr>
                                <tr>
                                  <td>Cliente:</td>
                                  <td>
                                    {editing ? (
                                      <select
                                        name="cliente_id"
                                        value={updatedFactura.empresa}
                                        onChange={handleClienteChange}
                                      >
                                        {clientes.map((cliente) => (
                                          <option key={cliente._id} value={cliente.empresa}>
                                            {cliente.empresa}
                                          </option>
                                        ))}
                                      </select>
                                    ) : (
                                      factura.cliente
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>CIF Cliente:</td>
                                  <td>{editing ? updatedFactura.CIF : factura.CIF}</td>
                                </tr>
                                <tr>
                                  <td>Fecha de Factura:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="date"
                                        name="fecha_de_factura"
                                        value={new Date(updatedFactura.fecha_de_factura).toISOString().split('T')[0]}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      new Date(factura.fecha_de_factura).toLocaleDateString()
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Vencimiento:</td>
                                  <td>
                                    {editing ? (
                                      <select
                                        name="vencimiento"
                                        value={updatedFactura.vencimiento}
                                        onChange={handleInputChange}
                                      >
                                        <option value="Al contado">Al contado</option>
                                        <option value="30 días fecha factura">30 días fecha factura</option>
                                        <option value="60 días fecha factura">60 días fecha factura</option>
                                      </select>
                                    ) : (
                                      factura.vencimiento
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Base Imponible:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="number"
                                        name="base_imponible"
                                        value={updatedFactura.base_imponible}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      factura.base_imponible
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Tipo de IVA:</td>
                                  <td>
                                    {editing ? (
                                      <select
                                        name="tipo_de_IVA"
                                        value={updatedFactura.tipo_de_IVA}
                                        onChange={handleInputChange}
                                      >
                                        <option value="21%">21%</option>
                                        <option value="10%">10%</option>
                                        <option value="4%">4%</option>
                                        <option value="Sin IVA">Sin IVA</option>
                                      </select>
                                    ) : (
                                      factura.tipo_de_IVA
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Importe IVA:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="number"
                                        name="importe_IVA"
                                        value={updatedFactura.importe_IVA}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      factura.importe_IVA
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Total Factura:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="number"
                                        name="total_factura"
                                        value={updatedFactura.total_factura}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      factura.total_factura
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Estado Factura:</td>
                                  <td>
                                    {editing ? (
                                      <select
                                        name="estado_factura"
                                        value={updatedFactura.estado_factura}
                                        onChange={handleInputChange}
                                      >
                                        <option value="En trámite">En trámite</option>
                                        <option value="Cerrada">Cerrada</option>
                                      </select>
                                    ) : (
                                      factura.estado_factura
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Fecha de Cobro:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="date"
                                        name="fecha_de_cobro"
                                        value={new Date(updatedFactura.fecha_de_cobro).toISOString().split('T')[0]}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      new Date(factura.fecha_de_cobro).toLocaleDateString()
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Pedido:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="text"
                                        name="pedido_id"
                                        value={updatedFactura.pedido_id}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      factura.pedido_id
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Albarán:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="text"
                                        name="albaran_id"
                                        value={updatedFactura.albaran_id}
                                        onChange={handleInputChange}
                                      />
                                    ) : (
                                      factura.albaran_id
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Archivo de Factura:</td>
                                  <td>
                                    {editing ? (
                                      <input
                                        type="file"
                                        name="archivo_de_factura"
                                        onChange={handleFileChange}
                                      />
                                    ) : (
                                      <a href={factura.archivo_de_factura}>Descargar Factura</a>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p>No se encontró la factura con el ID proporcionado.</p>
                        )}
                      </div>
                    </Col>
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

export default DetalleFacturas;