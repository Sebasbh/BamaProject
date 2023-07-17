import React from 'react';
import logo from '../assets/Images/logo.png';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar bg="white" variant="light" style={{ height: '10vh' }}>
        <Navbar.Brand>
          <img src={logo} alt="logo" className="navbar-logo" style={{ height: '15vh', marginRight: 'auto', padding: '30px' }} />
        </Navbar.Brand>
        <Nav className="ml-auto" style={{ marginLeft: 'auto', padding: '30px' }}>
          <Nav.Link as={Link} to="/GestionClientes" className="one" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#FF7300' }}>Clientes</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/GestionFacturas" className="two" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#E32718' }}>Facturas</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/GestionPedidos" className="three" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#114899' }}>Pedidos</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/GestionAlbaranes" className="four" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#2E2C84' }}>Albaranes</span>
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;