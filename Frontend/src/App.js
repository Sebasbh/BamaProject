import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import FormularioClientes from "./pages/Clientes/FormularioClientes";
import DetalleCliente from './pages/Clientes/DetalleCliente';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import CrearPedido from './pages/Pedidos/CrearPedido';
import GestionPedidos from './pages/Pedidos/GestionPedidos';
import DetallePedido from './pages/Pedidos/DellatePedido';
import "./App.css"
import Footer from './Components/footer/Footer';
import CrearFactura from './pages/Facturas/CrearFactura';
import DetalleFactura from './pages/Facturas/DetalleFactura';
import GestionFactura from './pages/Facturas/GestionFactura';
import GestionAlbaranes from "./pages/Albaranes/GestionAlbaranes";
import DetalleAlbaranes from "./pages/Albaranes/DetalleAlbaranes";
import FormularioAlbaranes from "./pages/Albaranes/FormularioAlbaranes";




const App = () => {
  const ProtectedCDcliente = withProtection(CDcliente);
  const ProtectedDetalleCliente = withProtection(DetalleCliente);
  const ProtectedGestionClientes = withProtection(GestionClientes);
  const ProtectedCrearPedido = withProtection(CrearPedido);
  const ProtectedGestionPedidos = withProtection(GestionPedidos);
  const ProtectedDetallePedido = withProtection(DetallePedido);

  return (
    <Router>
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Routes>
            <Route path="/Home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/DetalleCliente" element={<DetalleCliente />} />
            <Route path="/GestionClientes" element={<GestionClientes />} />
            <Route path="/FormularioClientes" element={<FormularioClientes />} />
            <Route path="/CrearPedido" element={<CrearPedido />} />
            <Route path="/GestionPedidos" element={<GestionPedidos />} />
            <Route path="/DetallePedido/:id" element={<DetallePedido />} />
            <Route path="/CrearFactura" element={<CrearFactura />} />
           <Route path="/DetalleFactura" element={<DetalleFactura />} /> 
           <Route path="/GestionFactura" element={<GestionFactura/>} /> 
          <Route path="/GestionAlbaranes" element={<GestionAlbaranes />} />
          <Route path="/DetalleAlbaranes/:id" element={<DetalleAlbaranes />} /> 
          <Route path="/FormularioAlbaranes" element={<FormularioAlbaranes/>} />     
            <Route element={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
