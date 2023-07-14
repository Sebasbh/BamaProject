import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CDcliente from './pages/Clientes/CDcliente';
import DetalleCliente from './pages/Clientes/DetalleCliente';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import DetallePedidos from './pages/Pedidos/DetallePedidos';
import GestionAlbaranes from './pages/Albaranes/GestionAlbaranes';
import DetalleAlbaranes from './pages/Albaranes/DetalleAlbaranes';
import FormularioAlbaranes from './pages/Albaranes/FormularioAlbaranes';
import './App.css';
import Footer from './Components/Footer/Footer';


const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Routes>

            <Route path="/Home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/cdcliente" element={<CDcliente />} />
            <Route path="/DetalleCliente" element={<DetalleCliente />} />
            <Route path="/GestionClientes" element={<GestionClientes />} />
            <Route path="/DetallePedidos" element={<DetallePedidos />} />
            <Route path="/GestionAlbaranes" element={<GestionAlbaranes />} />
            <Route path="/DetalleAlbaranes/:id" element={<DetalleAlbaranes />} />
            <Route path="/FormularioAlbaranes" element={<FormularioAlbaranes />} />


            <Route element={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>

  );
};

export default App;
