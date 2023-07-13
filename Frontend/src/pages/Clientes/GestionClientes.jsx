import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button  from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';




const URI = 'http://localhost:8000/clientes/'

function GestionClientes() {
  const [clientes, setCliente] = useState ([])
  useEffect ( ()=> {
    getCliente ()
  }, [])


  // procedimiento para mostrar todos los clientes
  const getCliente = async () => {
    const res = await axios.get(URI);
    setCliente(res.data);
  }





  // procedimiento para eliminar un cliente
  //const deleteCliente = async (id) => {

     //axios.delete(`${URI}${id}`)
     //getCliente()
  //}

  return (
    <div>GestionClientes</div>
  )
}


export default GestionClientes
