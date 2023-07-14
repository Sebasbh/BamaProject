import React from 'react';
import '../../Styles/CDcliente.css';
import personita from '../../Components/assets/Images/personita.png';
import direccion from '../../Components/assets/Images/direccion.png';
import CIF from '../../Components/assets/Images/CIF.png';
import tarjetas from '../../Components/assets/Images/tarjetas.png';
import contacto from '../../Components/assets/Images/contacto.png';
import Footer from '../../Components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CDcliente() {
  return (
    <div>
      <header>Encabezado</header>
      <Container>
        <form className='porfa'>
          <Row xs={1} md={2} className="justify-content-center mt-4">
            <Col sm={12} md={6}>
            <div className="mb-4">
              <img src={personita} alt='icono-cliente' className='personita' />
              <span className="larger-text">Cliente:</span>
              <input type="text" className='larger-input' />
              <hr className="horizontal-line" />
              </div>
            </Col>

            <Col sm={12} md={6}>
            <div className="mb-4">
              <img src={tarjetas} alt="tarjetas" className='tarjetas' />
              <span className="larger-text">Forma de Pago:</span>
              <input type="text" className='larger-input' />
              <hr className="horizontal-line" />
              </div>
            </Col>
          </Row>

          <Row xs={1} md={2} className="justify-content-center mt-4">
            <Col sm={12} md={6}>
            <div className="mb-4">
              <img src={direccion} alt='direccion' className='direccion' />
              <span className="larger-text">Dirección Social:</span>
              <input type="text" className='larger-input' />
              <hr className="horizontal-line" />
              </div>
            </Col>

            <Col sm={12} md={6}>
            <div className="mb-4">
              <img src={contacto} alt="contacto" className='contacto' />
              <span className="larger-text">Número de Contacto:</span>
              <input type="text" className='larger-input' />
              <hr className="horizontal-line" />
              </div>
            </Col>
          </Row>

          <Row xs={1} md={2} className="justify-content-center mt-4">
            <Col sm={12} md={6}>
            <div className="mb-4">
              <img src={CIF} alt="CIF" className='cif' />
              <span className="larger-text">CIF:</span>
              <input type="text" className='larger-input' />
              <hr className="horizontal-line" />
              </div>
            </Col>

            <Col sm={12} md={6} className="d-flex justify-content-end">
              <Button className='registro' type="submit">Registrar</Button>
            </Col>
          </Row>
        </form>
      </Container>
      <Footer />
    </div>
  );
}
