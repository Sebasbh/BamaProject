import React, { useEffect, useState } from "react";
import { Table, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlusSquare } from 'react-bootstrap-icons';
import Footer from '../../Components/footer/Footer';

const URI = 'http://localhost:8000/facturas/';

function GestionFactura() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    getAllFacturas();
  }, []);

  const getAllFacturas = async () => {
    try {
      const response = await axios.get(URI);
      setFacturas(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error al obtener las facturas:", error);
    }
  };

  return (
    <div>
      <Container>
      <Table striped hover className="mt-5">
        <thead className="text-center">
          <tr>
            <th>Nº factura</th>
            <th>Empresa</th>
            <th>Fecha factura</th>
            <th>Vencimiento</th>
            <th>Total factura</th>
            <th>Estado Factura</th>
          </tr>
        </thead>
        <tbody className="table-group-divider text-center">
          {facturas.length > 0 ? (
            facturas.map((factura) => (
              <tr key={factura._id}>
                <td>{factura.numero_de_factura}</td>
                <td>{new Date(factura.empresa).toLocaleDateString()}</td>
                <td>{factura.fecha_de_factura}</td>
                <td>{factura.vencimiento}</td>
                <td>{factura.estado_factura}</td>
                {/*<td>{(factura.total_facturado / factura.importe) * 100}%</td> */}
                <td>
                  <Badge variant={factura.estado === 'Enviado' ? 'success' : 'warning'}>
                    {factura.estado}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Cargando facturas...</td>
            </tr>
          )}
        </tbody>
      </Table>

      </Container>
    </div>
  );
}

export default GestionFactura;
