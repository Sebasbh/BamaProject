import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import {Container, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { ChevronCompactUp, Person } from 'react-bootstrap-icons';


function HomePage() {
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
      navigate('/');
      window.localStorage.removeItem('jwt');
    } else if (option === 'CLIENTES') {
      navigate('/GestionClientes');
    } else if (option === 'PEDIDOS') {
      navigate('/GestionPedidos');
    } else if (option === 'FACTURAS') {
      navigate('/GestionFactura')
    }
  else if (option === 'ALBARANES') {
    navigate('/GestionAlbaranes')
  }
  };

  return (
    <Container>
      <header className="d-flex align-items-center justify-content-between">
        <img src={logo} alt="logo" className="Logo" style={{ marginTop: '20px' }} />
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
      </header>

      <div className="btns">
        <Button
          className={`clientes ${hoveredButton === 'clientes' ? 'hovered' : ''}`}
          variant="light"
          onClick={() => handleButtonClick('CLIENTES')}
          onMouseEnter={() => handleMouseEnter('clientes')}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className={hoveredButton === 'clientes' ? 'hovered' : ''}>CLIENTES</h1>
          <ChevronCompactUp
            style={{ color: 'white' }}
            size={40}
            className={hoveredButton === 'clientes' ? 'hovered' : ''}
          />
        </Button>
        <Button
          className={`facturas ${hoveredButton === 'facturas' ? 'hovered' : ''}`}
          variant="light"
          onClick={() => handleButtonClick('FACTURAS')}
          onMouseEnter={() => handleMouseEnter('facturas')}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className={hoveredButton === 'facturas' ? 'hovered' : ''}>FACTURAS</h1>
          <ChevronCompactUp
            style={{ color: 'white' }}
            size={40}
            className={hoveredButton === 'facturas' ? 'hovered' : ''}
          />
        </Button>
        <Button
          className={`albaranes ${hoveredButton === 'albaranes' ? 'hovered' : ''}`}
          variant="light"
          onClick={() => handleButtonClick('ALBARANES')}
          onMouseEnter={() => handleMouseEnter('albaranes')}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className={hoveredButton === 'albaranes' ? 'hovered' : ''}>ALBARANES</h1>
          <ChevronCompactUp
            style={{ color: 'white' }}
            size={40}
            className={hoveredButton === 'albaranes' ? 'hovered' : ''}
          />
        </Button>
        <Button
          className={`pedidos ${hoveredButton === 'pedidos' ? 'hovered' : ''}`}
          variant="light"
          onClick={() => handleButtonClick('PEDIDOS')}
          onMouseEnter={() => handleMouseEnter('pedidos')}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className={hoveredButton === 'pedidos' ? 'hovered' : ''}>PEDIDOS</h1>
          <ChevronCompactUp
            style={{ color: 'white' }}
            size={40}
            className={hoveredButton === 'pedidos' ? 'hovered' : ''}
          />
        </Button>
      </div>
    </Container>
  );
}

export default HomePage;