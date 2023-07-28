import React from 'react';
import { Container, Row, Col, Table, Button, Breadcrumb } from 'react-bootstrap';
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
}

export default DetalleFactura;
