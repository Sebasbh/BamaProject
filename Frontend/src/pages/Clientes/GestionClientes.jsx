import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPlus } from '@fortawesome/free-solid-svg-icons';





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

  const breadcrumbItems = [
    { text: 'Inicio', link: '/Home' },
    { text: 'Cliente', link: '/categoria' },
  ];


  // procedimiento para eliminar un cliente
  //const deleteCliente = async (id) => {

     //axios.delete(`${URI}${id}`)
     //getCliente()
  //}

  return (
    //<div>GestionClientes</div>
    <div className='container'>
      <Breadcrumb>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            href={item.link}
            active={index === breadcrumbItems.length - 1}
          >
            {item.text}
          </Breadcrumb.Item>
        ))}
        </Breadcrumb>
        <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Buscar..." aria-label="Buscar" aria-describedby="boton-buscar"/>
              <button className="btn btn-primary" type="button" id="boton-buscar">Buscar</button> 
            </div>
          </div>
          <div className="col-md-8 text-right">
            <button className="btn btn-success">Crear cliente</button>
          </div>
        </div>
      </div>
  
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
            <tbody className='table-group-divider text-center'>
              { clientes.map ( (cliente, index) => (
                <tr key={ index }>
                  <td> { cliente.empresa }</td>
                  <td> { cliente.CIF_NIF} </td>
                  <td> { cliente.contacto} </td>
                  <td> { cliente.importe_pedido} </td>
                  <td> { cliente.fecha_pedido} </td>
                  <td> { cliente.forma_pago} </td>
                  <td>
                    <Link to={`/DectalleCliente/${cliente._id}`} className='btn btn-secondary'> Ver Detalles </Link>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a class="page-link" href="#">1</a></li>
              <li className="page-item"><a class="page-link" href="#">2</a></li>
              <li className="page-item"><a class="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  )
}


export default GestionClientes
