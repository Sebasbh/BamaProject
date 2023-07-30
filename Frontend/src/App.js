import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import Footer from './Components/footer/Footer';
import withProtection from "./Components/withProtection.js"

import FormularioClientes from "./pages/Clientes/FormularioClientes";
import DetalleCliente from './pages/Clientes/DetalleCliente';
import GestionClientes from './pages/Clientes/GestionClientes';

import CrearPedido from './pages/Pedidos/CrearPedido';
import GestionPedidos from './pages/Pedidos/GestionPedidos';
import DetallePedido from './pages/Pedidos/DetallePedido';

import CrearFactura from './pages/Facturas/CrearFactura';
import DetalleFactura from './pages/Facturas/DetalleFactura';
import GestionFactura from './pages/Facturas/GestionFactura';

import GestionAlbaranes from "./pages/Albaranes/GestionAlbaranes";
import DetalleAlbaranes from "./pages/Albaranes/DetalleAlbaranes";
import FormularioAlbaranes from "./pages/Albaranes/FormularioAlbaranes";

import "./App.css"

const App = () => {
  
  const ProtectedHomePage = withProtection(HomePage);
  const ProtectedFormularioClientes = withProtection(FormularioClientes);
  const ProtectedDetalleCliente = withProtection(DetalleCliente);
  const ProtectedGestionClientes = withProtection(GestionClientes);
  const ProtectedCrearPedido = withProtection(CrearPedido);
  const ProtectedGestionPedidos = withProtection(GestionPedidos);
  const ProtectedDetallePedido = withProtection(DetallePedido);
  const ProtectedCrearFactura = withProtection(CrearFactura);
  const ProtectedDetalleFactura = withProtection(DetalleFactura);
  const ProtectedGestionFactura = withProtection(GestionFactura);
  const ProtectedGestionAlbaranes = withProtection(GestionAlbaranes);
  const ProtectedDetalleAlbaranes = withProtection(DetalleAlbaranes);
  const ProtectedFormularioAlbaranes = withProtection(FormularioAlbaranes);

  return (
    <Router>
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<ProtectedHomePage />} />
            <Route path="/DetalleCliente/:id" element={<ProtectedDetalleCliente />} />
            <Route path="/GestionClientes" element={<ProtectedGestionClientes />} />
            <Route path="/FormularioClientes" element={<ProtectedFormularioClientes />} />
            <Route path="/CrearPedido" element={<ProtectedCrearPedido />} />
            <Route path="/GestionPedidos" element={<ProtectedGestionPedidos />} />
            <Route path="/DetallePedido/:id" element={<ProtectedDetallePedido />} />
            <Route path="/CrearFactura" element={<ProtectedCrearFactura />} />
            <Route path="/DetalleFactura/:id" element={<ProtectedDetalleFactura />} /> 
            <Route path="/GestionFactura" element={<ProtectedGestionFactura />} /> 
            <Route path="/GestionAlbaranes" element={<ProtectedGestionAlbaranes />} />
            <Route path="/DetalleAlbaranes/:id" element={<ProtectedDetalleAlbaranes />} /> 
            <Route path="/FormularioAlbaranes" element={<ProtectedFormularioAlbaranes />} />     
            <Route element={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;