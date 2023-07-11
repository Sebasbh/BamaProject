import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CDcliente from './pages/Clientes/CDcliente';
import DetalleCliente from './pages/Clientes/DetalleCliente';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import CrearPedido from './pages/Pedidos/CrearPedido';
import ListaPedido from './pages/Pedidos/GestionPedidos';
import DetallePedido from './pages/Pedidos/DellatePedido';

const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cdcliente" element={<CDcliente/>} />
        <Route path="/DetalleCliente" element={<DetalleCliente/>} />
        <Route path="/GestionClientes" element={<GestionClientes/>}/>
        <Route path="/CrearPedido" element={<CrearPedido/>}/>
        <Route path="/ListaPedido" element={<ListaPedido/>}/>
        <Route path="/detallePedido/:id" element={<DetallePedido />} />        <Route element={NotFound} />
       </Routes>
    </Router>
  );
};

export default App;

