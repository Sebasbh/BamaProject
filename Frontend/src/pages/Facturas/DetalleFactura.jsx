import React from 'react';
import { Container, Row, Col, Table, Button, Breadcrumb } from 'react-bootstrap';
import Header from '../../Components/Header/Header';

const DetalleFactura = () => {
  // Datos de la factura (puedes reemplazarlos con tus propios datos)
  const factura = {
    formaPago: 'Tarjeta de crédito',
    fechaVencimiento: '15 de julio de 2023',
    subtotal: 50,
    iva: 10,
    irpf: 5,
    total: 55,
  };

  // Datos del cliente (puedes reemplazarlos con tus propios datos)
  const cliente = {
    nombre: 'John Doe',
    direccion: 'Calle Principal 123',
    email: 'johndoe@example.com',
    telefono: '123456789',
  };

  return (

    <>

    <Header/>
    <Breadcrumb style={{ marginLeft: '100px', marginTop: '20px' }}>
          <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="http://localhost:3000/GestionFactura">Facturas</Breadcrumb.Item>
          <Breadcrumb.Item active>DetalleFactura</Breadcrumb.Item>
        </Breadcrumb>

    <Container>
      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '50px', marginTop: '40px' }}>
        <h4>Datos del cliente:</h4>
        <p>
          <strong>Cliente:</strong> {cliente.nombre}
        </p>
        <p>
          <strong>Dirección:</strong> {cliente.direccion}
        </p>
        <p>
          <strong>Email:</strong> {cliente.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {cliente.telefono}
        </p>
      </div>
      <h1>Detalle de Factura</h1>
      <Table striped bordered>
        <tbody>
          <tr>
            <td><strong>Forma de pago:</strong></td>
            <td>{factura.formaPago}</td>
          </tr>
          <tr>
            <td><strong>Fecha de vencimiento:</strong></td>
            <td>{factura.fechaVencimiento}</td>
          </tr>
          <tr>
            <td><strong>Subtotal:</strong></td>
            <td>${factura.subtotal}</td>
          </tr>
          <tr>
            <td><strong>IVA:</strong></td>
            <td>${factura.iva}</td>
          </tr>
          <tr>
            <td><strong>IRPF:</strong></td>
            <td>${factura.irpf}</td>
          </tr>
          <tr>
            <td><strong>Total:</strong></td>
            <td>${factura.total}</td>
          </tr>
        </tbody>
      </Table>
      <p><strong>Nota:</strong> El servicio tiene una validez de 30 días.</p>

      <Row className="botonesDescarga">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
             <Button variant="primary" className="botonPDF" size="sm" style={{ width: "120px" }}>📂 PDF</Button>
             <Button variant="primary" className="botonDescargas" size="sm" style={{ width: "120px", backgroundColor: "#00468b" }}>⬇️ Descargar</Button>
        </div>
      </Row>
    </Container>
    </>
  );
};

export default DetalleFactura;