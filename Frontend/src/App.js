import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CDcliente from './pages/Clientes/CDcliente';
import DetalleCliente from './pages/Clientes/DetalleCliente';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import CrearPedido from './pages/Pedidos/CrearPedido';
import GestionPedidos from './pages/Pedidos/GestionPedidos';
import DetallePedido from './pages/Pedidos/DetallePedido';
import "./App.css"
import Footer from './Components/footer/Footer';
import withProtection from './Components/withProtection';

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
            <Route path="/cdcliente" element={<ProtectedCDcliente />} />
            <Route path="/DetalleCliente" element={<ProtectedDetalleCliente />} />
            <Route path="/GestionClientes" element={<ProtectedGestionClientes />} />
            <Route path="/CrearPedido" element={<ProtectedCrearPedido />} />
            <Route path="/GestionPedidos" element={<ProtectedGestionPedidos />} />
            <Route path="/DetallePedido/:id" element={<ProtectedDetallePedido />} />
            <Route element={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
