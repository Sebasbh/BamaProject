import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CDcliente from './pages/Clientes/CDcliente';
import DetalleCliente from './pages/Clientes/DetalleCliente';
import NotFound from './pages/NotFound';
import GestionClientes from './pages/Clientes/GestionClientes';
import DetallePedidos from './pages/Pedidos/DetallePedidos';


const App = () => {
  return (
    <Router>
       <Routes>
      
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cdcliente" element={<CDcliente/>} />
        <Route path="/DetalleCliente/:id" element={<DetalleCliente/>} />
        <Route path="/GestionClientes" element={<GestionClientes/>}/>
        <Route path="/DetallePedidos" element={<DetallePedidos/>}/>
        <Route element={NotFound} />
       </Routes>
    </Router>
  );
};

export default App;
