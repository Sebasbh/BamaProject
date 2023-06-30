import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';




const URI = 'http://localhost:8000/clientes/'

function GestionClientes() {
  const [clientes, setCliente] = useState ([])
  useEffect ( ()=> {
    getCliente ()
  }, [])
  
  // procedimiento para mostrar todos los clientes
  const getCliente = async () => {
    
    const res = await axios.get(URI)
    setCliente(res.data)

  }

  // procedimiento para eliminar un cliente
  //const deleteCliente = async (id) => {

     //axios.delete(`${URI}${id}`)
     //getCliente()
  //}

  return (
    //<div>GestionClientes</div>
    <div className='container'>
      <div className='row'>
        <div className='col'> </div>
          <table className='table  table-hover'>
            <thead>
              <tr>
                <th scope="col">Empresa</th>
                <th scope="col">CIF/NIF</th>
                <th scope="col">Contacto</th>
                <th scope="col">Importe de pedido</th>
                <th scope="col">Fecha de pedido</th>
                <th scope="col">Forma de pago</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              { clientes.map ( (cliente, index) => (
                <tr key={ index }>
                  <td> { cliente.empresa }</td>
                  <td> { cliente.CIF_NIF} </td>
                  <td> { cliente.contacto} </td>
                  <td> { cliente.importe_pedido} </td>
                  <td> { cliente.fecha_pedido} </td>
                  <td> { cliente.forma_pago} </td>
                  <td>
                    <Link to={`/DectalleCliente/${cliente._id}`} className='btn btn-info'> Ver Detalles </Link>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
      </div>
    </div>
  )
}


export default GestionClientes