import React, { useState } from 'react';
import logo from '../assets/Images/logo.png';
import { Navbar, Nav, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Person } from 'react-bootstrap-icons';

function Header() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleButtonClick = (option) => {
    console.log(`Se hizo clic en el botón "${option}"`);
    // Realiza la lógica adicional que desees aquí
    if (option === 'Cerrar Sesión') {
      // Redirige al usuario a la página de inicio de sesión
      window.localStorage.removeItem('jwt');
      navigate('/');
    }
  };

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
          <Nav.Link as={Link} to="/GestionFactura" className="two" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#E32718' }}>Facturas</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/GestionPedidos" className="three" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#114899' }}>Pedidos</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/GestionAlbaranes" className="four" style={{ textDecoration: 'none', color: 'black' }}>
            <span style={{ textDecoration: 'underline', color: '#2E2C84' }}>Albaranes</span>
          </Nav.Link>
        </Nav>
        <OverlayTrigger
        trigger="click"
        placement="bottom"
        show={popoverOpen}
        onToggle={togglePopover}
        overlay={
          <Popover id="popover-menu">
            <Popover.Body>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li
                  onClick={() => handleButtonClick('Cerrar Sesión')}
                  style={{ cursor: 'pointer' }}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="link" onClick={togglePopover}>
          <Person
            size={40}
            md={5}
            className={hoveredButton === 'person' ? 'hovered' : ''}
            onMouseEnter={() => handleMouseEnter('person')}
            onMouseLeave={handleMouseLeave}
          />
        </Button>
      </OverlayTrigger>
      </Navbar>

    </>
  );
}

export default Header;
