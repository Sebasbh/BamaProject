import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DetalleCliente from './pages/Clientes/DetalleCliente'
import FormularioClientes from './pages/Clientes/FormularioClientes';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import DetalleFactura from './pages/Facturas/DetalleFactura';
import CrearPedido from './pages/Pedidos/CrearPedido';
import GestionPedidos from './pages/Pedidos/GestionPedidos';
import DetallePedido from './pages/Pedidos/DellatePedido';

const App = () => {
  return (
    <Router>
       <Routes>
      
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cdcliente" element={<CDcliente/>} />
        <Route path="/DectalleCliente" element={<DetalleCliente/>} />
        <Route path="/GestionClientes" element={<GestionClientes/>}/>
        <Route element={NotFound} />
       </Routes>
    </Router>
  );
};

export default App;

