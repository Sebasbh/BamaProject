import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import React from 'react'


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
          <table className='table table-striped  table-hover'>
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Dirección Social</th>
              <th scope="col">CIF</th>
              <th scope="col">Forma de pago</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
            { clientes.map ( (cliente, index) => (
              <tr key={ index }>
                <td> { cliente.nombre }</td>
                <td> { cliente.direccion_social} </td>
                <td> { cliente.CIF} </td>
                <td> { cliente.forma_de_pago} </td>
                <td>
                  <Link to={`/DectalleCliente/${cliente._id}`} className='btn btn-info'></Link>
                </td>
              </tr>
            )) }
          </table>
      </div>
    </div>
  )
}


export default GestionClientes