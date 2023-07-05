import React from 'react'
import './Header.css'
import logo from '../assets/Images/logo.png';
import { Navbar, Nav } from 'react-bootstrap';


function Header() {

  return (
    <>

      <Navbar bg="white" variant="light" style={{ height: '10vh' }}>
        <Navbar.Brand>
          <img src={logo} alt="logo" className="navbar-logo" style={{ height: '15vh', marginRight: 'auto', padding: '30px' }} />
        </Navbar.Brand>
        <Nav className="ml-auto" style={{ marginLeft: 'auto', padding: '30px' }}>
          <Nav.Link className="one">Clientes</Nav.Link>
          <Nav.Link className="two">Facturas</Nav.Link>
          <Nav.Link className="three">Pedidos</Nav.Link>
          <Nav.Link className="four">Albaranes</Nav.Link>
        </Nav>
      </Navbar>





    </>

  )
}

export default Header